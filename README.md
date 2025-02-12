
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
| `controllers/FAQ.Controller.js` | Logic for handling FAQ requests |
| `models/FAQModel.js` | Mongoose schema for FAQs |
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
   git clone https://github.com/yourusername/bharat-fd-assignment.git
   cd bharat-fd-assignment
   ```

2️⃣ **Install dependencies**
   ```sh
   npm install
   ```

3️⃣ **Set up environment variables** (`.env` file)
   ```
   MONGO_URI=your_mongodb_connection_string
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4️⃣ **Run the application**
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:8080`


## 🌐 API Endpoints

### 1️⃣ **Create a FAQ**
```http
POST /Faqs/create-faq
```
**Request Body:**
```json
{
  "question": "What is an API?",
  "answer": "An API is an endpoint used for communication between systems.",
  "targetLanguage": "hi"
}
```
✅ **Response:**
```json
{
  "message": "Faq Created Successfully",
  "faq": {
    "_id": "64b6a3d6e98f67a3d",
    "question": "What is an API?",
    "answer": "An API is an endpoint used for communication between systems."
  }
}
```


### 2️⃣ **Fetch FAQs (With Translations)**
```http
GET /Faqs?targetLanguage=hi
```
✅ **Response:**
```json
{
  "translatedFaqs": [
    {
      "_id": "64b6a3d6e98f67a3d",
      "question": "एपीआई क्या है?",
      "answer": "एपीआई सिस्टमों के बीच संचार के लिए एक एंडपॉइंट है।"
    }
  ]
}
```


### 3️⃣ **Update a FAQ**
```http
PUT /Faqs/:id
```
**Request Body:**
```json
{
  "question": "What is an API in detail?",
  "answer": "An API is a set of protocols and tools for building software applications.",
  "targetLanguage": "hi"
}
```
✅ **Response:**
```json
{
  "message": "Successfully Updated Faq",
  "UpdatedFAQ": {
    "question": "What is an API in detail?",
    "answer": "An API is a set of protocols and tools for building software applications."
  }
}
```



### 4️⃣ **Delete a FAQ**
```http
DELETE /Faqs/:id
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

[🎬 Video File Updated (Google Drive)](https://drive.google.com/file/d/1ww4Jm6k87rVpNAdu_T7QCEupRG8R_v-t/view?usp=sharing)



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
