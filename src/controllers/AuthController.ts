import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User';
import State from '../models/State';

export const signin = async (req: Request, res: Response) => {
    
}

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped()});
        return;
    }

    const { name, email, state, password } = matchedData(req);

    const hasUser = await User.findOne({ email });
    if (hasUser) {
        res.json({ 
            error: { email: { msg: "Este e-mail já existe." } }
        });
        return; 
    }

    if (!mongoose.Types.ObjectId.isValid(state)) {
        res.json({ 
            error: { state: { msg: "Código de estado inválido." } }
        });
        return;
    }

    const hasState = await State.findById(state);
    if (!hasState) {
        res.json({ 
            error: { state: { msg: "Estado não existe." } }
        });
        return;
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, saltRounds);

    const newUser = new User ({
        name,
        email,
        state,
        passwordHash,
        token
    });
    await newUser.save();

    res.json({ token });
}