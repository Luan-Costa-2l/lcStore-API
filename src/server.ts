import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mainRoutes from './routes/api'
dotenv.config();

mongoose.connect(process.env.NODE_DATABASE as string, { authSource: "admin" })
    .then(res => console.log("Connected with db!"))
    .catch((error) => console.log((error as Error).message));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Route not found.' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
