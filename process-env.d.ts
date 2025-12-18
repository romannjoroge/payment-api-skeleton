declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            NODE_ENV: "local" | "staging" | "production",
            LOG_LEVEL: "info" | "silent"
        }
    }
}

export {};