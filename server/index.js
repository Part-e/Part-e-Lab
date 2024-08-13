import app from './app.js';
import dotenv from "dotenv";
import { connectDB } from './db.js';

dotenv.config();

connectDB();
app.listen(process.env.PORT)
console.log('App running');