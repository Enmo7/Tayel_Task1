from fastapi import FastAPI, UploadFile, File, HTTPException
from schemas import ImageCaptionResponse
from ml_services import generate_image_caption, translate_to_arabic

app = FastAPI(
    title="Image Captioning & Translation API",
    description="API to upload an image, generate an English caption, and translate it to Arabic."
)

@app.post("/process-image/", response_model=ImageCaptionResponse)
async def process_image(file: UploadFile = File(...)):
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    try:
        
        image_bytes = await file.read()
        
   
        english_caption = generate_image_caption(image_bytes)
 
        arabic_caption = translate_to_arabic(english_caption)
        
       
        return ImageCaptionResponse(
            english_caption=english_caption,
            arabic_caption=arabic_caption
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))