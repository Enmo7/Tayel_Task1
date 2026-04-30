<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Image Captioner Frontend

This is a Vite React frontend for uploading images and requesting captions from your backend API.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set `VITE_CAPTION_API_URL` in `.env.local` to your backend caption endpoint:
   `VITE_CAPTION_API_URL="http://localhost:4000/api/caption"`
3. Run the app:
   `npm run dev`

## Backend Contract

The frontend sends a `POST` request as `multipart/form-data`:

- `image`: the uploaded image file
- `mimeType`: the image MIME type

The backend should respond with:

```json
{ "caption": "A short generated caption." }
```
