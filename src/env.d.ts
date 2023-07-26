declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development';
            PORT: string;
            NODE_BASE: string;
            NODE_DATABASE: string;

            

            NODE_API_KEY: string;
            NODE_AUTH_DOMAIN: string;
            NODE_PROJECT_ID: string;
            NODE_STORAGE_BUCKET: string;
            NODE_MESSAGING_SENDER_ID: string;
            NODE_APP_ID: string;
        }
    }
}

export {}