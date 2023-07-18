import { checkSchema } from "express-validator";

export const editAction = checkSchema({
    token: {
        notEmpty: {
            errorMessage: "Token inválido, faça login novamente."
        }
    },
    name: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2 },
            errorMessage: "O nome precisa ter mais de 2 caracteres."
        },
    },
    email: {
        optional: true,
        notEmpty: {
            errorMessage: "O campo email não pode estar vazio.",
        },
        isEmail: {
            errorMessage: "E-mail inválido."
        },
        normalizeEmail: true
    },
    state: {
        optional: true,
        notEmpty: {
            errorMessage: "O campo estado não pode estar vazio."
        }
    },
    password: {
        notEmpty: {
            errorMessage: "O campo senha não pode estar vazio."
        },
    },
    newPassword: {
        optional: true,
        isLength: {
            options: { min: 4 },
            errorMessage: "Nova senha precisa ter pelo menos 4 caracteres."
        }
    }
});