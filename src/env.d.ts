declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development';
            PORT: string;
            NODE_BASE: string;
            NODE_DATABASE: string;
        }
    }
}

export {}