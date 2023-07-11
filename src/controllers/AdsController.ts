import { Request, Response } from "express";
import Ad from '../models/Ad';
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json({ categories });
}

export const getList = async (req: Request, res: Response) => {
    res.json({ getList: 'ok' });
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