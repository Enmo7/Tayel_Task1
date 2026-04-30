import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import captionModel from '../../../DB/models/caption.model';

export const generateCaption = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided.' });
      return;
    }

    const { mimeType } = req.body;
    
    // AI API details from environment variables
    const aiApiUrl = process.env.AI_API_URL;
    const aiApiKey = process.env.AI_API_KEY;

    // The image saved locally
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    let caption = '';

    // If AI API is not configured yet, return a mock response
    if (!aiApiUrl) {
      console.log('AI_API_URL not set. Returning mock response.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      caption = 'This is a mock caption from the backend.';
    } else {
      // Forward the image to the AI API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: req.file.mimetype || mimeType,
      });

      const aiResponse = await axios.post(aiApiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          ...(aiApiKey ? { 'Authorization': `Bearer ${aiApiKey}` } : {}),
        },
      });

      caption = aiResponse.data.caption;

      if (!caption) {
          res.status(500).json({ error: 'Invalid response from AI API.' });
          return;
      }
    }

    // Save to database
    await captionModel.create({
        imageUrl,
        caption
    });

    res.json({ caption });

  } catch (error: any) {
    console.error('Error generating caption:', error.message || error);
    res.status(500).json({ error: 'Failed to generate caption.' });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const history = await captionModel.find().sort({ createdAt: -1 });
        
        // Map it to match what the frontend UI expects: { id, image, caption, date }
        const formattedHistory = history.map(item => ({
            id: item._id,
            image: item.imageUrl,
            caption: item.caption,
            date: new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            }).format(item.createdAt)
        }));

        res.json({ history: formattedHistory });
    } catch (error: any) {
        console.error('Error fetching history:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch history.' });
    }
};
