import { Request, Response } from "express";
import mongoose from "mongoose";
import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import State from "../models/State";
import User from "../models/User";
import Ad from "../models/Ad";
import Category from "../models/Category";

export const getStates = async (req: Request, res: Response) => {
    const states = await State.find();
    res.json({ states });
}

export const info = async (req: Request, res: Response) => {
    const { token, sort = 'asc', offset = 0, limit = 8, q, cat } = req.query;

    const user = await User.findOne({ token });

    if (!user) {
        res.json(401)
        res.json({ error: "Token inválido, tente refazer o login." });
        return;
    }

    const state = await State.findById(user._id.toString());

    const userId = user._id.toString();
    let filters: { 
        status: boolean, 
        userId: string,
        title?: { $regex: string; $options: string; }, 
        category?: string, 
        state?: string }  
    = { status: true, userId };

    if (q) {
        filters.title = { '$regex': q as string, '$options': 'i'}
    }

    if (cat) {
        const c = await Category.findOne({ slug: cat as string }).exec();
        if (c) {
            filters.category = c._id.toString();
        }
    }

    const adsTotal = await Ad.find(filters).exec();

    const options = {
        limit: parseInt(limit as string),
        skip: parseInt(offset as string),
        sort: { dateCreated: sort == 'desc' ? -1 : 1}
    }

    const ads = await Ad.find(filters, null, options).exec();

    const adList = ads.map(ad => {
        const defaultImage = ad.images.find(img => img.default);
        const image = `${process.env.NODE_BASE}/media/${defaultImage ? defaultImage.name :'default'}.png`;
        return {
            id: ad._id.toString(),
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            image
        }
    });

    const userInfo = {
        name: user.name,
        email: user.email,
        state: state?.name,
        ads: adList,
        adsTotal: adsTotal.length
    }

    res.json({ userInfo });
}

export const editAction = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const { name, email, state, password, newPassword, token } = matchedData(req);

    const newUserInfo: {name?: string, email?: string, state?: string, passwordHash?: string} = {};

    const user = await User.findOne({ token });

    const match = await bcrypt.compare(password, user?.passwordHash as string);

    if (!match) {
        res.json({ error: "Senha incorreta." });
        return;
    }

    if (name) {
        newUserInfo.name = name;
    }
    if (email) {
        newUserInfo.email = email;
    }
    if (state) {
        if (!mongoose.Types.ObjectId.isValid(state)) {
            res.json({ error: "Código de estado inválido." });
            return;
        }

        const checkState = await State.findById(state);

        if (!checkState) {
            res.json({ error: "Estado Inválido." });
            return;
        }
        newUserInfo.state = state;
    }
    if (newPassword) {
        newUserInfo.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    await User.findOneAndUpdate({ token }, newUserInfo);    

    res.json({ updated: true });
}