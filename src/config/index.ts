import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        const mongo_uri = process.env.MONGO_URI;
        if (!mongo_uri) {
            console.log('MongoDB URI not provided - running without database');
            return null;
        }
        const conn = await mongoose.connect(mongo_uri);
        console.log('MongoDB connected: ' + conn.connection.host);
        return conn;
    }catch(err){
        console.log('MongoDB connection error:', err);
        console.log('Running without database for now');
        return null;
    }
}