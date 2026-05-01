import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import captionRouter from './src/modules/caption/caption.router.js';
import connectDB from './DB/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();

// to allow requests from the frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

app.use(express.json());

// Serve uploads folder statically so frontend can access the images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/caption', captionRouter);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
