import { createClient } from "redis"


export async function redisClientGet(value: string) {
   const client = createClient({
      url: "redis://103.250.11.249:6379",
      password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"

   })
   client.on("error", err => console.error("Redis Error on: " + err))
   await client.connect();

   const dbValue = await client.get(value)
   console.log(dbValue)
   await client.disconnect();
   return dbValue
}

redisClientGet("dio")
