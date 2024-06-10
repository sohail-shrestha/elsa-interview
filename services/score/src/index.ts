import express from 'express';
import { createClient } from 'redis';

const app = express();

const redisClient = async () =>{
    const client = createClient({
        url: "redis://event-bus"
      })
    const subscriber = client.duplicate()     
    await subscriber.connect();

    await subscriber.subscribe("ON_QUIZ_SUBMITTED", message => {
        console.log(message)
    })
}




app.listen(3003, () => 

{
    redisClient()
    console.log("App listening on port 3003")})
