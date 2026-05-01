# Image Captioner Backend

This is the backend for the "Image Captioner" project. It is built with **Node.js** and **Express** using a modular architecture.

## Features
- **Bilingual Captions:** Automatically generates both English and Arabic captions for uploaded images.
- **AI Integration:** Seamlessly connects with a FastAPI-based AI service (BLIP for captioning + MarianMT for translation).
- **Image Upload:** Securely handles image uploads locally using `Multer`.
- **Database Persistence:** Stores image URLs and their bilingual captions in **MongoDB**.
- **History API:** Provides endpoints to retrieve historical analysis for the frontend.

## Tech Stack
- **Node.js & Express** (Modern ES Modules)
- **MongoDB & Mongoose**
- **FastAPI** (AI Service)
- **Multer** (File Handling)
- **Axios** (Service Communication)

## Project Structure
- `DB/`: Database connection and bilingual caption models.
- `src/modules/`: Main business logic (Caption generation and history).
- `src/middleware/`: Middleware for file uploads and processing.
- `index.js`: Main entry point.

## How to Run Locally

### 1. Start the AI Service
Ensure the AI folder is running via Docker:
```bash
cd ../AI
docker-compose up
```

### 2. Configure Backend
Ensure `.env` contains:
```env
PORT=4000
MONGO_URI=your_mongodb_uri
AI_API_URL=http://localhost:8000/process-image/
```

### 3. Start Backend
```bash
cd backend
npm install
npm run dev
```

## API Endpoints
- `POST /api/caption`: Receives an image, forwards it to the AI service, saves result, and returns bilingual captions.
- `GET /api/caption/history`: Returns a list of all previously analyzed images with their captions and timestamps.
