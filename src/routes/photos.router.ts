import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Photos from "../models/photos";
import { collections } from "../services/database.service";


export const photosRouter = express.Router();

photosRouter.use(express.json());


photosRouter.get("/photos", async (_req: Request, res: Response) => {
    try {
       const photos = await collections.photos.find({}).toArray();

        res.status(200).send(photos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

photosRouter.post("/photos", async (req: Request, res: Response) => {
    try {
        const newPhotos = req.body;
        const result = await collections.photos.insertOne(newPhotos);

        result
            ? res.status(201).send(`Successfully created a new photo with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

photosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPhotos: Photos = req.body;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.photos.updateOne(query, { $set: updatedPhotos });

        result
            ? res.status(200).send(`Successfully updated photos with id ${id}`)
            : res.status(304).send(`Photos with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

photosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.photos.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed photo with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove photo with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Photo with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});