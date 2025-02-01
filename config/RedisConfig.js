import redis from "redis"
const redisClient = redis.createClient({
    socket:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    }
})
redisClient.connect();
redisClient.on("connect",()=>{console.log("Connected To redis")});
redisClient.on("error",(error)=>{console.log("Internal server error",error.message)});
export default redisClient;