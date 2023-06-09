import mongoose from 'mongoose';

// Function for connection to database
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(String(process.env.MongoURL), {
            dbName: `TicketBot`
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
}