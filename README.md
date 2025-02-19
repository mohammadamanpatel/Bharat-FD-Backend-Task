# 🌎 Bharat FD Assignment - FAQ Web App Backend with Multi-language Support 🚀

## 📌 Overview

This project is a **FAQ Management API** that supports **multi-language translations** using `googletrans`. It allows users to **create, read, update, and delete FAQs**, while providing real-time translations in different languages. The system uses **Redis caching** for optimized performance.


## 💡 Tech Stack

| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime for server-side logic |
| **Express.js** | Web framework for handling API requests |
| **MongoDB** | NoSQL database for storing FAQs |
| **Mongoose** | ODM for MongoDB interaction |
| **Json Web token** | JWT For authentication |
| **Redis** | In-memory caching for performance optimization |
| **googletrans** | Library for translating FAQs dynamically |
| **Mocha & Chai** | Testing framework for API validation |


## 🏆 Features

✅ **Multi-language Support** using `googletrans`  
✅ **CRUD operations** for FAQ management  
✅ **Redis caching** for better performance  
✅ **Unit Testing** with Mocha,Chai & SuperTest  
✅ **Mongoose ODM** for MongoDB interaction  


## 🏗 Folder Structure

| 📂 Directory/File      | 📌 Description |
|----------------------|--------------|
| `config/Db.Connect.js` | MongoDB connection setup |
| `config/RedisConfig.js` | Redis client setup for caching |
| `controllers/FAQ.Controller.js/USER.controller.js` | Logic for handling FAQ and user requests |
| `middlewares/Auth.middleware.js/Role.middleware.js` | middlewares for authN and authZ |
| `models/FAQModel.js/USERModel.js` | Mongoose schema for FAQs and users|
| `routes/FAQ.routes.js` | Express routes for FAQ API |
| `testing/Chai.js` | Unit tests using Mocha & Chai |
| `Trans_Util/TransLate_Text.js` | Translation utility using `googletrans` |
| `.env` | Environment variables |
| `server.js` | Main entry point of the application |


## ⚙️ Installation & Setup

### 🔧 Prerequisites

- **Node.js** (>= 16.x)
- **MongoDB** (Running locally or on a cloud service like MongoDB Atlas)
- **Redis** (For caching)
- **Postman** (Optional, for testing API endpoints)

### 🚀 Setup Steps

1️⃣ **Clone the repository**
   ```sh
   git clone https://github.com/mohammadamanpatel/Bharat-FD-Backend-Task
   cd bharat-fd-assignment
   ```

2️⃣ **Install dependencies**
   ```sh
   npm install
   ```

3️⃣ **Set up environment variables** (`.env` file)
   ```
    PORT = <your-port-no>
    MONGO_URL = <your-mongo-url>
    JWT_SECRET = <your-jwt-secret>
    JWT_EXPIRY = <your-jwt-expiry>
    COOKIE_MAX_AGE = <your-cookie-max-age>
    REDIS_PASSWORD = <your-redis-insight-password>
    REDIS_HOST = <your-redis-host>
    REDIS_PORT = <your-redis-port>
   ```

4️⃣ **Run the application**
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:<your-port-no>`


## 🌐 API Endpoints

### 1️⃣ **Create a FAQ**
```http
POST /api/Faqs/create-faq
```
**Request Body:**
```json
{
  "question": "What is an API?",
  "answer": "An API is an endpoint used for communication between systems.",
  "translations": {
    "hi": {},
    "ur": {}
  }
}
```
✅ **Response:**
```json
{
    "message": "FAQ Created Successfully",
    "faq": {
        "question": "What is an api",
        "answer": "api is a endpoint",
        "translations": {
            "hi": {
                "question": "एक एपीआई क्या है",
                "answer": "एपीआई एक समापन बिंदु है",
                "_id": "67b5b6118e31c7b65d54d2dd"
            },
            "ur": {
                "question": "ایک API کیا ہے؟",
                "answer": "API ایک اختتامی نقطہ ہے",
                "_id": "67b5b6118e31c7b65d54d2de"
            }
        },
        "_id": "67b5b6118e31c7b65d54d2dc",
        "createdAt": "2025-02-19T10:44:33.046Z",
        "updatedAt": "2025-02-19T10:44:33.046Z",
        "__v": 0
    }
}
```


### 2️⃣ **Fetch FAQs (With Translations)**
```http
GET /api/Faqs?targetLanguage=ur
```
✅ **Response:**
```json
{
    "translatedFaqs": [
        {
            "_id": "67b5b6118e31c7b65d54d2dc",
            "question": "ایک API کیا ہے؟",
            "answer": "API ایک اختتامی نقطہ ہے",
            "createdAt": "2025-02-19T10:44:33.046Z",
            "updatedAt": "2025-02-19T10:44:33.046Z"
        }
    ]
}
```

### 3️⃣ **Update a FAQ**
```http
PUT /api/Faqs/:id
```
**Request Body:**
```json
{
    "question":"What are apis ?",
    "answer":"Apis are endpoints",
    "translations": {
    "hi": {},
    "ur": {},
    "es":{},
    "fr":{}
  }
}
```
✅ **Response:**
```json
{
    "message": "Successfully Updated FAQ",
    "updatedFAQ": {
        "_id": "67b5b6118e31c7b65d54d2dc",
        "question": "What are apis ?",
        "answer": "Apis are endpoints",
        "translations": {
            "hi": {
                "question": "एपीआई क्या हैं?",
                "answer": "एपीआई समापन बिंदु हैं",
                "_id": "67b5b6558e31c7b65d54d2e1"
            },
            "ur": {
                "question": "APIs کیا ہیں؟",
                "answer": "APIs اختتامی نکات ہیں",
                "_id": "67b5b6558e31c7b65d54d2e2"
            },
            "es": {
                "question": "¿Qué son las API?",
                "answer": "Las API son puntos finales",
                "_id": "67b5b6558e31c7b65d54d2e3"
            },
            "fr": {
                "question": "Que sont les API?",
                "answer": "Les API sont des points de terminaison",
                "_id": "67b5b6558e31c7b65d54d2e4"
            }
        },
        "createdAt": "2025-02-19T10:44:33.046Z",
        "updatedAt": "2025-02-19T10:45:41.404Z",
        "__v": 0
    }
}
```

### 4️⃣ **Delete a FAQ**
```http
DELETE /api/Faqs/:id
```
✅ **Response:**
```json
{
  "message": "Faq Deleted"
}
```

## **📘 API Documentation**
For a detailed description of the API, including request and response formats, refer to the full **API Documentation** here:  
[📄 API Documentation (Postman)](https://www.postman.com/joint-operations-cosmologist-64352344/workspace/faqs-api-s/collection/30730048-7507c690-49b8-4a24-a3e2-ee16000e90c9?action=share&creator=30730048)


## **🎥 Video Demonstration**
Watch the **video demonstration** of this project in action here:  
[🎬 Video File (Google Drive)](https://drive.google.com/file/d/14rUwzarV5kxL3dq6oxfTfKvZFylWH74X/view?usp=sharing)

[🎬 Video File Updated (Google Drive)](https://drive.google.com/file/d/1zWf3MKMu8VU7NinM6Na14bTr73_wrfc-/view?usp=sharing)

## 🧪 Running Tests
To run unit tests:
```sh
npm test
```

## 🤝 Contributing
1. **Fork** the repository  
2. **Clone** it locally:  
   ```sh
   git clone https://github.com/mohammadamanpatel/Bharat-FD-Backend-Task
   ```
3. **Create a feature branch**  
   ```sh
   git checkout -b new-feature
   ```
4. **Commit changes**  
   ```sh
   git commit -m "Added a new feature"
   ```
5. **Push to GitHub**  
   ```sh
   git push origin new-feature
   ```
6. **Create a Pull Request** 🎉  

## 🚀 Author
👨‍💻 Mohd Aman Naim Patel  
💻 [LinkedIn](https://www.linkedin.com/in/mohd-aman-patel/)
