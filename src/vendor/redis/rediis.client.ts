import { createClient } from "redis"


export async function redisClientSetWithExpire(key: string, value: string, expireTime: number) {
   const client = createClient()
   client.on("error", err => console.error("Redis Error on: " + err))
   await client.connect();

   await client.setEx(key, expireTime, value);
   await client.disconnect();
}

export async function redisClientGet(value: string) {
   const client = createClient()
   client.on("error", err => console.error("Redis Error on: " + err))
   await client.connect();

   const dbValue = await client.get(value)
   await client.disconnect();
   return dbValue
}
