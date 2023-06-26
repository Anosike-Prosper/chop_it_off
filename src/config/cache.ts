import { createClient, RedisClientType } from 'redis';
import config from './config'


function RedisDb () {
    let client: RedisClientType;

    return async function RedisDb(){
        
        if(client) {
            return client; 
        }
        client = createClient({ url: config.REDIS ?? "" });

        await client.connect();
        client.on('error', (err: any) => console.log('Redis Client Error', err));
        client.on("connect", () => {
            console.log('Redis connection successfl')
        })
        return client
    }
}

export default RedisDb();


