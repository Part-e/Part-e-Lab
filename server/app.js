import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

dotenv.config();

//Servidor
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
})); //Permitir que todos los dominios se puedan comunicar
app.use(morgan('dev'));
//convertir los req.body en json
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes)
app.use("/api", tasksRoutes)

export default app;