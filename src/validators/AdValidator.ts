import { checkSchema } from "express-validator";

export const addad = checkSchema({
    token: {
        notEmpty: {
            errorMessage: "Token inexistente, faça login novamente."
        }
    },
    category: {
        notEmpty: {
            errorMessage: "O campo categoria não pode estar vazio."
        }
    },
    title: {
        notEmpty: {
            errorMessage: "O campo titulo não pode estar vazio."
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "O titulo precisa ter pelo menos 3 caracteres."
        }
    },
    price: {
        notEmpty: {
            errorMessage: "O campo preço não pode estar vazio."
        }
    },
    priceNegotiable: {
        notEmpty: {
            errorMessage: "O campo preço negociável não pode estar vazio."
        },
        isBoolean: {
            errorMessage: "O campo preço negociável precisa ser verdadeiro ou falso."
        }
    },
    description: {
        notEmpty: {
            errorMessage: "O anúncio precisa de uma descrição."
        },
        isLength: {
            options: { min: 10 },
            errorMessage: "A descrição precisa ter pelo menos 10 caracteres."
        }
    }
});