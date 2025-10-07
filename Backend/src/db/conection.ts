import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const connection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Base de datos conectada satisfactoriamente");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

export default connection;


