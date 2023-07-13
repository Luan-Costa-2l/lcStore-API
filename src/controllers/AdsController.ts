import { Request, Response } from "express";
import Ad, { AdInstance } from '../models/Ad';
import Category, { CategoryInstance } from "../models/Category";
import State from "../models/State";

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
            image = `${process.env.NODE_BASE}/media/${defaultImage.name}.png`;
        } else {
            image = `${process.env.NODE_BASE}/media/${ad.images[0].name ?? 'default'}.png`;
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
    res.json({ getItem: req.params.id });
}

export const editAction = async (req: Request, res: Response) => {
    res.json({ editAction: 'atualizou!' });
}