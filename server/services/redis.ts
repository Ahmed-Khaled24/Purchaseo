const redis = require("redis");
import keys from "../config/keys";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";

let redisClient = redis.createClient({
    password: "9NBbpKwNI6wudQ44gBEgawdG1onuUeB0",
    socket :{
        host: keys.REDIS_HOST,
        port: keys.REDIS_PORT,
    }
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});
redisClient.on("error", (err: any) => {
    console.error("Error connecting to Redis server:", err);
});
redisClient.on("disconnect", () => {
    console.log("Redis is disconnected");
});

async function connectRedis() {
    await redisClient.connect();
}
async function disconnectRedis() {
    await redisClient.disconnect();
}

async function cache(key: string, callback: () => Promise<any>) {
    const cached = await redisClient.get(key);
    if (cached) {
        return JSON.parse(cached);
    }
    const freshData = await callback();
    await redisClient.set(key, JSON.stringify(freshData));
    return freshData;
}

async function regulateRequests(key: number){
    let userKey = `s3_user_${key}`;
    let blackListedUserKey = `blacklist_s3_user_${key}`;
    const cached = await redisClient.get(userKey);
    const blackListed = await redisClient.get(blackListedUserKey);
    if(blackListed){
        throw new ErrorWithStatusCode("You are blocked for too many requests to s3 try again later", 429)
    }

    if (cached) {
        await redisClient.set(`blacklist_s3_user_${key}`, key);
        await redisClient.expire(`blacklist_s3_user_${key}`, 3500);
        throw new ErrorWithStatusCode("Too many requests to s3", 429)
    }
    await redisClient.set(userKey, key);
    await redisClient.expire(userKey, 1);
    return
}
export { redisClient, connectRedis, disconnectRedis, cache, regulateRequests };
