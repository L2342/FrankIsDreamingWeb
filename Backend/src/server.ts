import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './db/conection';
import bodyParser from 'body-parser';
import userRoutes from './routes/User';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
connection();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});