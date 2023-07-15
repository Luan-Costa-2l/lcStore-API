import { Request, Response, NextFunction} from 'express';

export const signin = async (req: Request, res: Response) => {
    
}

export const signup = async (req: Request, res: Response) => {
    const { name, email, state, password, token } = req.body;

    res.json({ signup: { name, email, state, password, token } });
}