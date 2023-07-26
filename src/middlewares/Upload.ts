import multer from "multer";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import sharp from "sharp";
import { uploadImage } from "../models/firebase";

// export const ImageSharp = (buffer: Buffer, w: number, h: number, fileName: string) => {
//     const dest = path.join(__dirname, '../../public/media/');
//     const fullFileName = uuidv4().concat(path.extname(fileName));
//     sharp(buffer).resize(w, h).jpeg({ quality: 80 }).toFile(dest.concat(fullFileName));

//     return fullFileName;
// }

export const imageSharp = async (file: Express.Multer.File, w?: number, h?: number) => {
    const fullFileName = uuidv4().concat(path.extname(file.originalname));
    const newBuffer = await sharp(file.buffer).resize(w ?? 500, h ?? 500).jpeg({ quality: 80 }).toBuffer();
    let newFile = file;
    newFile.buffer = newBuffer;
    newFile.filename = fullFileName;
    const url = await uploadImage(newFile);
    return url;
}

const uploadFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const acceptMimetype = ['image/png', 'image/jpg', 'image/jpeg'];
    acceptMimetype.includes(file.mimetype) ? cb(null, true) : cb(null, false);
}

const storage = multer.memoryStorage();

export const upload = multer({ storage, fileFilter: uploadFilter });
