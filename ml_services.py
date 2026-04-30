import io
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from transformers import MarianMTModel, MarianTokenizer


caption_model_name = "Salesforce/blip-image-captioning-base"
processor = BlipProcessor.from_pretrained(caption_model_name)
caption_model = BlipForConditionalGeneration.from_pretrained(caption_model_name)


translation_model_name = "Helsinki-NLP/opus-mt-en-ar"
tokenizer = MarianTokenizer.from_pretrained(translation_model_name)
translator_model = MarianMTModel.from_pretrained(translation_model_name)

def generate_image_caption(image_bytes: bytes) -> str:
   
    
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
   
    inputs = processor(image, return_tensors="pt")
    out = caption_model.generate(**inputs, max_new_tokens=50)
    caption = processor.decode(out[0], skip_special_tokens=True)
    
    return caption

def translate_to_arabic(text: str) -> str:
    
   
    inputs = tokenizer(text, return_tensors="pt", padding=True)
    translated = translator_model.generate(**inputs)
    arabic_text = tokenizer.decode(translated[0], skip_special_tokens=True)
    
    return arabic_text