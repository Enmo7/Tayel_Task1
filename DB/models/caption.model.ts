import mongoose, { Schema, Document } from 'mongoose';

export interface ICaption extends Document {
    imageUrl: string;
    caption: string;
    createdAt: Date;
    updatedAt: Date;
}

const captionSchema: Schema = new Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true }
}, { 
    timestamps: true 
});

const captionModel = mongoose.models.Caption || mongoose.model<ICaption>('Caption', captionSchema);

export default captionModel;
