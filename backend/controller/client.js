// const redis = require("redis");

// const client = redis.createClient({
//   password: "zKgPvQTBxtX1UU67pIEZWxsNvZkoX2Nz",
//   socket: {
//     host: "redis-18355.c56.east-us.azure.cloud.redislabs.com",
//     port: 18355,
//   },
// });

// (async () => {
//   client.on("connect", function () {
//     console.log("Redis client connected");
//   });

//   client.on("error", function (err) {
//     console.log("Something went wrong " + err);
//   });

//   await client.connect();
// })();
// module.exports = client;
const mongoose = require('mongoose')
const exec = mongoose.Query.prototype.exec;
const redis = require('redis');
let redisClient;
(async () => {
    redisClient = redis.createClient({
        password: 'zKgPvQTBxtX1UU67pIEZWxsNvZkoX2Nz',
        socket: {
            host: 'redis-18355.c56.east-us.azure.cloud.redislabs.com',
            port: 18355
        }
    });
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    redisClient.on("connect", () => console.log(`Connected to redis`));
    await redisClient.connect();
})();

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || 'default')
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments)
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))
    const cachedVal = await redisClient.HGET(this.hashKey, key)
    if (cachedVal) {
        const doc = JSON.parse(cachedVal)
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }
    const result = await exec.apply(this, arguments)
    await redisClient.HSET(this.hashKey, key, JSON.stringify(result))
    return result
}

module.exports = {
    async clearHash(hashKey) {
        redisClient.del(JSON.stringify(hashKey));
    }
};




