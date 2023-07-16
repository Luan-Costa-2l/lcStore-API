import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User';
import State from '../models/State';

export const signin = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }

    const { email, password } = matchedData(req);

    const user = await User.findOne({ email });

    if (!user) {
        res.json({
            error: { login: { msg: "E-mail e/ou senha errados."} }
        })
        return;
    }

    const matchPassword = await bcrypt.compare(password, user.passwordHash);

    if (!matchPassword) {
        res.json({
            error: { login: { msg: "E-mail e/ou senha errados."} }
        })
        return;
    }

    const saltRounds = 12;
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, saltRounds);

    user.token = token;
    await user.save();

    res.json({ token, email });
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