import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import captionModel from '../../../DB/models/caption.model.js';

export const generateCaption = async (req, res) => {
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
    let englishCaption = '';
    let arabicCaption = '';

    // If AI API is not configured yet, return a mock response
    if (!aiApiUrl) {
      console.log('AI_API_URL not set. Returning mock response.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      englishCaption = 'This is a mock caption from the backend.';
      arabicCaption = 'هذا تعليق تجريبي من الخادم.';
      caption = `${englishCaption} | ${arabicCaption}`;
    } else {
      // Forward the image to the AI API
      const formData = new FormData();
      formData.append('file', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: req.file.mimetype || mimeType,
      });

      const aiResponse = await axios.post(aiApiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          ...(aiApiKey ? { 'Authorization': `Bearer ${aiApiKey}` } : {}),
        },
      });

      englishCaption = aiResponse.data.english_caption;
      arabicCaption = aiResponse.data.arabic_caption;

      if (!englishCaption || !arabicCaption) {
          res.status(500).json({ error: 'Invalid response from AI API.' });
          return;
      }
      
      caption = `${englishCaption} | ${arabicCaption}`;
    }

    // Save to database
    await captionModel.create({
        imageUrl,
        englishCaption,
        arabicCaption
    });

    res.json({ caption });

  } catch (error) {
    console.error('Error generating caption:', error.message || error);
    res.status(500).json({ error: 'Failed to generate caption.' });
  }
};

export const getHistory = async (req, res) => {
    try {
        const history = await captionModel.find().sort({ createdAt: -1 });
        
        // Map it to match what the frontend UI expects: { id, image, caption, date }
        const formattedHistory = history.map(item => ({
            id: item._id,
            image: item.imageUrl,
            caption: `${item.englishCaption} | ${item.arabicCaption}`,
            date: new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            }).format(item.createdAt)
        }));

        res.json({ history: formattedHistory });
    } catch (error) {
        console.error('Error fetching history:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch history.' });
    }
};

export const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await captionModel.findById(id);
        
        if (!item) {
            return res.status(404).json({ error: 'History item not found.' });
        }

        // Try to delete the physical image file to save space
        if (item.imageUrl) {
            const filename = item.imageUrl.split('/').pop();
            const filePath = path.join(process.cwd(), 'uploads', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await captionModel.findByIdAndDelete(id);

        res.json({ message: 'History item deleted successfully.', id });
    } catch (error) {
        console.error('Error deleting history:', error.message || error);
        res.status(500).json({ error: 'Failed to delete history.' });
    }
};
