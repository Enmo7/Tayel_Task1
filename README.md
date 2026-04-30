# Image Captioner Backend

This is the backend for the "Image Captioner" project. It is built with **Node.js** and **Express** using a clean and modular architecture.

## Features
- **Image Upload:** Upload images locally to the `uploads` folder using `Multer`.
- **Database:** Save image history and captions in **MongoDB**.
- **AI Integration:** Ready to connect with an external AI API to generate captions.
- **History API:** Fetch previous images and captions to display on the website.

## Tech Stack
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Multer (File Handling)
- Axios (API Communication)

## Project Structure
The project follows a modular structure to keep it organized:
- `DB/`: Database connection and models.
- `src/modules/`: Main business logic (e.g., Caption module).
- `src/middleware/`: Middleware like Multer for file uploads.
- `uploads/`: Local folder where uploaded images are stored.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure MongoDB is running locally.
3. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints
- `POST /api/caption`: Upload an image and get a caption.
- `GET /api/caption/history`: Get the history of all uploaded images and captions.
