import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mainRoutes from './routes/api'
import { upload } from './middlewares/Upload';
dotenv.config();

mongoose.connect(process.env.NODE_DATABASE as string).catch(error => console.log(error));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array('img', 5));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Route not found.' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
