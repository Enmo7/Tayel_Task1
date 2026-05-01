import mongoose from 'mongoose';

const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/image-captioner')
        .then(() => {
            console.log('Database connected successfully');
        }).catch((error) => {
            console.log('Error connecting to database: ', error.message);
            process.exit(1); 
        });
}

export default connectDB;
