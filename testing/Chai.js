import request from "supertest";
import { expect } from "chai";
import app from "../server.js"; // Assuming app.js is your server entry point
import redisClient from "../config/RedisConfig.js";

let adminToken;

describe("User API Routes", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  it("login a user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "testuser@example.com",
      password: "password123"
    });
    console.log(res.body); // Log the response body for debugging
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "You Loggedin Successfully"); // Adjusted to match the actual response message
    adminToken = res.body.token; // Save the token for authenticated requests
    console.log("adminToken", adminToken); // Log the token for debugging
  });
});

describe("FAQ API Routes with Multi-language Support", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  let faqId;
  const faqInputs = [
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      targetLanguage: "en"
    },
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      targetLanguage: "hi"
    },
    {
      question: "What is an API?",
      answer: "An API is an endpoint used for communication between systems.",
      targetLanguage: "ur"
    }
  ];

  faqInputs.forEach(({ question, answer, targetLanguage }) => {
    it(`create a new FAQ with translations in ${targetLanguage}`, async () => {
      const res = await request(app)
        .post("/api/Faqs/create-faq")
        .set("Cookie", `token=${adminToken}`)
        .send({ question, answer, targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Faq Created Successfully");
      expect(res.body.faq).to.have.property("question", question);
      expect(res.body.faq).to.have.property("answer", answer);
      
      faqId = res.body.faq._id;
      expect(faqId).to.not.be.undefined;

      const cachedFaqs = await redisClient.get(`faqs:${targetLanguage}`);
      expect(cachedFaqs).to.be.null;
    });

    it(`fetch all FAQs in ${targetLanguage}`, async () => {
      const res = await request(app).get("/api/Faqs").query({ targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("translatedFaqs");
      expect(res.body.translatedFaqs).to.be.an("array").that.is.not.empty;
    });

    it(`update an existing FAQ and translate into ${targetLanguage}`, async () => {
      const res = await request(app)
        .put(`/api/Faqs/${faqId}`)
        .set("Cookie", `token=${adminToken}`)
        .send({
          question: "What is an API in detail?",
          answer: "An API is a set of protocols and tools for building software applications.",
          targetLanguage
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Successfully Updated Faq");
      expect(res.body.UpdatedFAQ).to.have.property("question", "What is an API in detail?");
      expect(res.body.UpdatedFAQ).to.have.property("answer", "An API is a set of protocols and tools for building software applications.");
    });

    it(`delete a FAQ and clear cache for ${targetLanguage}`, async () => {
      const res = await request(app)
        .delete(`/api/Faqs/${faqId}`)
        .set("Cookie", `token=${adminToken}`)
        .send({ targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Faq Deleted");
    });
  });
});

describe("User API Routes", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  it("logout a user", async () => {
    const res = await request(app).get("/api/user/logout").set("Cookie", `token=${adminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "You successfully logged Out"); // Adjusted to match the actual response message
  });
});