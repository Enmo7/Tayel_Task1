# Image Captioner Frontend

A mobile-first React app for uploading images, taking photos with the camera, and generating image captions through a backend API.

The frontend is ready for backend integration. Until `VITE_CAPTION_API_URL` is configured, the app uses temporary mock captions so the full UI flow can be tested.

## Completed Features

- Mobile-first responsive UI.
- Image upload with file picker.
- Drag and drop image upload.
- Camera capture using the browser camera API.
- Camera permission handling for denied access.
- Fallback states for unavailable or busy cameras.
- Uploaded image queue.
- Remove image from queue.
- Generate caption for one image.
- Generate captions for all queued images.
- Regenerate captions.
- Copy generated captions.
- Animated image analysis overlay.
- Caption typewriter animation.
- Recent caption history.
- Caption history persisted in localStorage.
- Backend-ready caption API service.
- Temporary mock captions before backend connection.
- Feature-based source structure.
- Strict TypeScript setup.
- Provider-specific frontend AI code removed.

## Project Structure

```text
src/
  app/
    App.tsx
  features/
    image-captioner/
      components/
      hooks/
      services/
      utils/
      types.ts
      index.ts
  shared/
    components/
  index.css
  main.tsx
```

## Important Files

- `src/app/App.tsx`: main app layout and page composition.
- `src/features/image-captioner/hooks/useImageCaptioner.ts`: image queue, caption generation, history, and toast state.
- `src/features/image-captioner/services/captionApi.ts`: backend caption request logic and mock caption fallback.
- `src/features/image-captioner/components/CameraCapture.tsx`: camera preview, capture, permissions, retry, and cleanup.
- `src/features/image-captioner/components/ImageQueue.tsx`: uploaded images queue.
- `src/features/image-captioner/components/ImageCard.tsx`: single uploaded image card.
- `src/features/image-captioner/utils/files.ts`: file validation and file reading.
- `src/features/image-captioner/utils/historyStorage.ts`: localStorage caption history.

## Run Locally

**Prerequisite:** Node.js

```bash
npm install
npm run dev
```

The app runs on:

```text
http://localhost:3000
```

## Environment Variables

Create `.env.local` when the backend is ready:

```env
VITE_CAPTION_API_URL="http://localhost:4000/api/caption"
```

If `VITE_CAPTION_API_URL` is missing, the app returns temporary mock captions.

## Backend API Contract

The frontend sends a multipart request:

```http
POST /api/caption
Content-Type: multipart/form-data
```

Form fields:

- `image`: uploaded image file.
- `mimeType`: image MIME type.

Expected JSON response:

```json
{
  "caption": "A short generated caption."
}
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Verification

The frontend has been verified with:

```bash
npm run lint
npm run build
```
