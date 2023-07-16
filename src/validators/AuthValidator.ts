import { checkSchema } from 'express-validator';

export const signin = checkSchema({
    email: {
        notEmpty: {
            errorMessage: "O campo e-mail não pode estar vazio."
        },
        isEmail: {
            errorMessage: "Formato de e-mail inválido."
        },
        normalizeEmail: true
    },
    password: {
        notEmpty: {
            errorMessage: "O campo senha não pode estar vazio."
        },
        isLength: {
            options: { min: 4 },
            errorMessage: "Senha precisa ter pelo menos 4 caracteres."
        }
    }
});

export const signup = checkSchema({
    name: {
        trim: true,
        notEmpty: {
            errorMessage: "O campo nome não pode estar vazio."
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "O nome precisa ter mais de 2 caracteres."
        },
    },
    email: {
        notEmpty: {
            errorMessage: "O campo e-mail não pode estar vazio."
        },
        isEmail: {
            errorMessage: "Formato de e-mail inválido."
        },
        normalizeEmail: true
    },
    state: {
        notEmpty: {
            errorMessage: "O campo estado não pode estar vazio."
        },
    },
    password: {
        notEmpty: {
            errorMessage: "O campo senha não pode estar vazio."
        },
        isLength: {
            options: { min: 4 },
            errorMessage: "Senha precisa ter pelo menos 4 caracteres."
        }
    }
});