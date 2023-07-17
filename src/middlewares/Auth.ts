import { Request, Response, NextFunction } from "express";
import { validationResult, matchedData } from 'express-validator';
import User from "../models/User";

export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401)
        res.json({ notAllowed: true });
        return;
    }
    const { token } = matchedData(req);
    const user = await User.findOne({ token });
    if (!user) {
        res.status(401)
        res.json({ notAllowed: true });
        return;
    }
    next();
}