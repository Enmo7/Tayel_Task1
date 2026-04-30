from pydantic import BaseModel

class ImageCaptionResponse(BaseModel):
    english_caption: str
    arabic_caption: str