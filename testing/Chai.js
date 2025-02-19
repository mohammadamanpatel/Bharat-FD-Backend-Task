import request from "supertest";
import { expect } from "chai";
import app from "../server.js"; 
import redisClient from "../config/RedisConfig.js";

let adminToken;

describe("User API Routes", function () {
  this.timeout(5000); 

  it("login a user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "Aman@admin1.com",
      password: "password1234"
    });
    console.log(res.body); // Log the response body for debugging
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "You Loggedin Successfully"); 
    adminToken = res.body.token; 
    console.log("adminToken", adminToken); 
  });
});

describe("FAQ API Routes with Multi-language Support", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  let faqId;
  const faqInputs = [
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      translations: {
        hi: {},
        ur: {}
      }
    },
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      translations: {
        es: {},
        fr: {}
      }
    },
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      translations: {
        es: {},
        fr: {}
      }
    }
  ];

  faqInputs.forEach(({ question, answer, translations }) => {
    it(`create a new FAQ with translations`, async () => {
      const res = await request(app)
        .post("/api/Faqs/create-faq")
        .set("Cookie", `token=${adminToken}`)
        .send({ question, answer, translations });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "FAQ Created Successfully");
      expect(res.body.faq).to.have.property("question", question);
      expect(res.body.faq).to.have.property("answer", answer);

      faqId = res.body.faq._id;
      expect(faqId).to.not.be.undefined;

      for (const lang in translations) {
        const cachedFaqs = await redisClient.get(`faqs:${lang}`);
        expect(cachedFaqs).to.be.null;
      }
    });

    it(`fetch all FAQs in en`, async () => {
      const res = await request(app).get("/api/Faqs").query({ targetLanguage: "en" });
      console.log(res.body); // Log the response body for debugging
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("translatedFaqs");
      expect(res.body.translatedFaqs).to.be.an("array").that.is.not.empty;
    });

    it(`update an existing FAQ and translate into en`, async () => {
      const res = await request(app)
        .put(`/api/Faqs/${faqId}`)
        .set("Cookie", `token=${adminToken}`)
        .send({
          question: "What is an API in detail?",
          answer: "An API is a set of protocols and tools for building software applications.",
          translations: {
            en: {}
          }
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Successfully Updated FAQ");
      expect(res.body.updatedFAQ).to.have.property("question", "What is an API in detail?");
      expect(res.body.updatedFAQ).to.have.property("answer", "An API is a set of protocols and tools for building software applications.");
    });

    it(`delete a FAQ and clear cache for en`, async () => {
      const res = await request(app)
        .delete(`/api/Faqs/${faqId}`)
        .set("Cookie", `token=${adminToken}`)
        .send({ targetLanguage: "en" });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "FAQ Deleted");
    });
  });
});

describe("User API Routes", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  it("logout a user", async () => {
    const res = await request(app)
      .get("/api/user/logout")
      .set("Cookie", `token=${adminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "You successfully logged Out"); 
  });
});
