export const SERVER_PORT: number =  Number( process.env.PORT ) || 5000
export const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379
export const REDIS_HOST: string = process.env.HOST || 'redis'