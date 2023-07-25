import multer from "multer";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from "path";

const uploadFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const acceptMimetype = ['image/png', 'image/jpg', 'image/jpeg'];
    acceptMimetype.includes(file.mimetype) ? cb(null, true) : cb(null, false);
}

const storage = multer.diskStorage({
    filename(req, file, cb) {
        const uniqueId = uuidv4().concat(path.extname(file.originalname));
        cb(null, uniqueId);
    },
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/media'));
    },
});

const limit = {}

export const upload = multer({ storage, fileFilter: uploadFilter });
