import mongoose, { Schema } from 'mongoose';

const captionSchema = new Schema({
    imageUrl: { type: String, required: true },
    englishCaption: { type: String, required: true },
    arabicCaption: { type: String, required: true }
}, { 
    timestamps: true 
});

const captionModel = mongoose.models.Caption || mongoose.model('Caption', captionSchema);

export default captionModel;
