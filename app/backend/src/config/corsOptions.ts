import "bun:dotenv";

const allowedOrigins = Bun.env.CORS_ORIGINS ? Bun.env.CORS_ORIGINS.split(',') : [];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200
}

export default corsOptions;