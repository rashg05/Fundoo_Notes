import { createClient } from 'redis';

export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        console.log("Redis is connected");
    } catch (error) {
        console.log("could not connect to the redis database", error);
    }
}

export default clientRedis;