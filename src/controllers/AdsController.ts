import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import dotenv from 'dotenv';
import Ad, { AdInstance } from '../models/Ad';
import Category, { CategoryInstance } from "../models/Category";
import State from "../models/State";
import User from "../models/User";
dotenv.config();

export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json({ categories });
}

export const getList = async (req: Request, res: Response) => {
    const { sort = 'asc', offset = 0, limit = 8, q, cat, state } = req.query;

    let filters: { 
        status: boolean, 
        title?: { $regex: string; $options: string; }, 
        category?: string, 
        state?: string } 
        = { status: true };

    let total = 0;

    if (q && typeof q == 'string') {
        filters.title = {'$regex': q, '$options': 'i'};
    }
    if (cat && typeof cat == 'string') {
        const c = await Category.findOne({ slug: cat }).exec();
        if (c) {
            filters.category = c._id.toString();
        }
    }
    if (state && typeof state == 'string') {
        const s = await State.findOne({ name: state }).exec();
        if (s) {
            filters.state = s._id.toString();
        }
    }

    const options = {
        skip: parseInt(offset as string),
        limit: parseInt(limit as string),
        sort: {dateCreated: sort == 'desc' ? -1 : 1}
    }

    const adsTotal = await Ad.find(filters).exec();
    total = adsTotal.length;

    const adsData: AdInstance[] = await Ad.find(filters, null, options).exec();

    let ads = [];

    for (let ad of adsData) {
        let image = '';
        const defaultImage = ad.images.find(image => image.default);
        if (defaultImage) {
            image = `${process.env.NODE_BASE}/media/${defaultImage.url}.png`;
        } else {
            image = `${process.env.NODE_BASE}/media/${ad.images[0].url ?? 'default'}.png`;
        }
        ads.push({
            id: ad._id,
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            image
        })
    }

    res.json({ ads, total });
}

export const addAction = async (req: Request, res: Response) => {
    res.json({ addAction: 'ok' });
}

export const getItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { other = null } = req.query;

    if (!id) {
        res.json({ error: "Sem produto" });
        return;
    }

    if (!isValidObjectId(id) && id.length < 12) {
        res.json({ error: "Id inválido." });
        return;
    }

    const ad = await Ad.findById(id);

    if (!ad) {
        res.status(404);
        res.json({ error: "Nenhum anúncio encontrado." });
        return;
    }

    ad.views++;
    await ad.save();

    const images = ad.images.map(image => image.url);

    const userInfo = await User.findById(ad.userId).exec();
    const stateInfo = await State.findById(ad.state).exec();
    const category = await Category.findById(ad.category).exec();

    let others: {id: string, title: string, price: number, priceNegotiable: boolean, image: string}[] = [];
    if (other) {
        const otherAds = await Ad.find({ status: true, userId: ad.userId }).exec();

        otherAds.forEach(otherAd => {
            if (otherAd._id.toString() != ad._id.toString()) {
                let image = `${process.env.NODE_BASE}/media/default.png`;
                const defaultImage = otherAd.images.find(image => image.default);
                if (defaultImage) {
                    image = defaultImage.url;
                }
                others.push({
                    id: otherAd._id.toString(),
                    title: otherAd.title,
                    price: otherAd.price,
                    priceNegotiable: otherAd.priceNegotiable,
                    image
                });
            }
        });
    }

    res.status(200);
    res.json({
        id: ad._id.toString(),
        title: ad.title,
        price: ad.price,
        priceNegotiable: ad.priceNegotiable,
        description: ad.description,
        dateCreated: ad.dateCreated,
        views: ad.views,
        stateName: stateInfo?.name,
        category,
        images,
        userInfo: {
            name: userInfo?.name,
            email: userInfo?.email
        },
        others,
    });
}

export const editAction = async (req: Request, res: Response) => {
    res.json({ editAction: 'atualizou!' });
}