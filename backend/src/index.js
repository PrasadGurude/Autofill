import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase', {})

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
