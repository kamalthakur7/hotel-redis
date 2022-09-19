import express from 'express';

import { Client, Repository } from "redis-om";
import { userSchema } from "./schema/task.schema.js";

const app = express();
app.use(express.json());

const client = new Client();
try {
    await client.open("redis://sam:Qwerty!1234@redis-13568.c264.ap-south-1-1.ec2.cloud.redislabs.com:13568");

    console.log('redis db connected');
} catch (error) {
    console.log(erroe);
}
const user = new Repository(userSchema, client);

await user.dropIndex();
await user.createIndex();

app.get('/hotels', async(req, res) => {
    res.send(await user.search().returnAll());
});

app.post('/hotels', async(req, res) => {
    const hotel = user.createEntity();

    hotel.name = req.body.name;
    hotel.price = req.body.price;
    hotel.description = req.body.description;
    hotel.rating = req.body.rating;
    hotel.address = req.body.address;
    hotel.contact = req.body.contact;
    hotel.id = await user.save(hotel);

    res.send(hotel);
});
app.get('/hotels/:id', async(req, res) => {
    const hotel = await user.fetch(req.params.id);
    if (!hotel) {
        res.send("No hotel with that id")
    }
    res.send(hotel);
});

app.put('/hotels/:id', async(req, res) => {
    const hotel = await user.fetch(req.params.id);


    hotel.name = req.body.name;
    hotel.price = req.body.price;
    hotel.description = req.body.description;
    hotel.rating = req.body.rating;
    hotel.address = req.body.address;
    hotel.contact = req.body.contact;
    await userRepository.save(hotel);

    res.send(hotel);
});

app.delete('/hotels/:id', async(req, res) => {
    await user.remove(req.params.id);
    res.send({
        message: "deleted successfully",
        success: true
    });
});

app.listen(8000, () => {
    console.log('app is listening to port 8000');
});