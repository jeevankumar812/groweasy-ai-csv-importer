# 🚀 GrowEasy AI CSV Importer

An AI-powered CRM CSV Importer built with **Next.js, Node.js, Express.js, MongoDB Atlas, and Groq AI**.

The application allows users to upload CSV files with any column format, preview the data, and intelligently transform it into a standardized CRM Lead format using AI.

---

## 🌐 Live Demo

Frontend:
https://groweasy-cdnfj2nft-jeevan-kumars-projects-b1207112.vercel.app/

Backend:
https://groweasy-ai-csv-importer-p00m.onrender.com/

---

## 📂 GitHub Repository

https://github.com/jeevankumar812/groweasy-ai-csv-importer

---


# 👨‍💻 About the Developer

Hi, I'm **K Jeevan Kumar**, a **2026 B.E. graduate** from **Alva's Institute of Engineering & Technology (AIET), Karnataka**.

I am a passionate **Full Stack MERN Developer** with a strong interest in **Backend Development, Artificial Intelligence, REST APIs, System Design, and Database Management**. I enjoy solving real-world problems by building scalable web applications and continuously improving my software engineering skills.

This GrowEasy AI CSV Importer project demonstrates my ability to design and develop a complete full-stack application—from building a responsive frontend with Next.js to implementing a robust Node.js backend, integrating AI-powered data processing, using MongoDB Atlas for cloud data storage, containerizing the application with Docker, and deploying it to production.

---

## 👤 Personal Details

**Name:** K Jeevan Kumar

**Education:** Bachelor of Engineering (B.E.)

**College:** Alva's Institute of Engineering & Technology (AIET)

**Graduation Year:** 2026

**Role:** Full Stack MERN Developer

---

# ✨ Features

- Upload CSV files
- CSV Preview before importing
- AI-powered column mapping
- Automatic CRM Lead extraction
- Data validation
- Skip invalid records
- Import statistics
- Responsive UI
- MongoDB Atlas integration
- Dockerized backend and frontend
- REST API architecture

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React.js
- CSS3
- Axios

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- CSV Parser

## AI

- Groq API
- Llama 3.3 70B Versatile

## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

# 📁 Project Structure

```
groweasy-ai-csv-importer
│
├── backend
│   ├── src
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/jeevankumar812/groweasy-ai-csv-importer.git

cd groweasy-ai-csv-importer
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

GROQ_API_KEY=your_groq_api_key
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://groweasy-ai-csv-importer-p00m.onrender.com/api
```

---

# Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Stop

```bash
docker compose down
```

---

# API Endpoints

## Upload CSV

```
POST /api/import/upload
```

Form Data

```
file : csv file
```

---

## Import CSV

```
POST /api/import/import
```

Body

```json
{
    "fileName":"sample.csv",
    "rows":[]
}
```

---

# AI Workflow

1. User uploads CSV
2. CSV is parsed
3. Preview is generated
4. User confirms import
5. CSV rows are sent to Groq AI
6. AI maps unknown column names into CRM fields
7. Data is validated
8. Valid records are stored in MongoDB
9. Statistics are displayed

---

# Why Groq AI?

This project uses **Groq AI** instead of OpenAI or Gemini for the following reasons:

- Very low response latency, making CSV processing feel faster.
- OpenAI-compatible API, allowing straightforward integration with existing tooling.
- Free developer tier suitable for building and demonstrating projects.
- Supports powerful open-weight language models that perform well on structured data extraction tasks.
- Reliable JSON generation when combined with structured prompts, which helps map arbitrary CSV columns into a consistent CRM schema. :contentReference[oaicite:1]{index=1}

---

# Future Improvements

- Authentication
- Import History
- Export CRM Leads
- Duplicate Detection
- AI Confidence Score
- Background Job Queue
- Admin Dashboard
- Role Based Access
- Email Notifications

---

# Author

**K Jeevan Kumar**

Full Stack MERN Developer

GitHub

https://github.com/jeevankumar812

LinkedIn

(Add your LinkedIn URL here)

---

# License

This project is developed for the **GrowEasy AI Assignment**.
