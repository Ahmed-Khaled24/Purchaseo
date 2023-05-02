const redis = require("redis");
import keys from "../config/keys";

let redisClient = redis.createClient({
    host: keys.REDIS_HOST,
    port: keys.REDIS_PORT,
});

redisClient.on("connect" , () => {
    console.log("Redis connected");
})
redisClient.on('error', (err: any) => {
    console.error('Error connecting to Redis server:', err);
});
redisClient.on('disconnect', () => {
    console.log('Redis is disconnected');
});

async function connectRedis() {
    await redisClient.connect();
}
async function disconnectRedis() {
    await redisClient.disconnect();
}

async function cache(key: string, callback : () => Promise<any>){
    const cached = await redisClient.get(key);
    if(cached){
        return JSON.parse(cached);
    }
    const freshData = await callback();
    await redisClient.set(key, JSON.stringify(freshData));
    return freshData;
}

export { redisClient, connectRedis, disconnectRedis, cache };