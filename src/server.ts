import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRoutes from './routes/api'
dotenv.config();

mongoose.connect(process.env.NODE_DATABASE as string).catch(error => console.log(error));

const app = express();

app.use(cors());

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Route not found.' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
