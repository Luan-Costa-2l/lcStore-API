import { Request, Response, NextFunction } from "express";
import { validationResult, matchedData } from 'express-validator';
import User from "../models/User";

export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.token && !req.body.token) {
        res.json({ notAllowed: true });
        return;
    }
    const token = req.query.token ? req.query.token : req.body.token;

    if (token == '') {
        res.json({ notAllowed: true });
        return;
    }
    
    const user = await User.findOne({ token });
    if (!user) {
        res.status(401)
        res.json({ notAllowed: true });
        return;
    }
    next();
}