import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Photos from "../models/photos";
import { collections } from "../services/database.service";
import { createValidator } from "express-joi-validation";
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation'
import { decodeToken } from "../firebase/adminTokens";

//Schema joi 
import photoSchema from "../schemas-joi/photos.schemajoi";

export const photosRouter = express.Router();

const validator = createValidator();

photosRouter.use(express.json());

photosRouter.use((err: any | ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // ContainerTypes is an enum exported by this module. It contains strings
    // such as "body", "headers", "query"...
    if (err && err.type in ContainerTypes) {
        const e: ExpressJoiError = err
        // e.g "you submitted a bad query paramater"
        res.status(400).end(`You submitted a bad ${e.type} paramater`)
    } else {
        res.status(500).end('internal server error')
    }
})


photosRouter.get("/photos", decodeToken, async (_req: Request, res: Response) => {
    try {
        const photos = await collections.photos.find({}).toArray();

        res.status(200).send(photos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

photosRouter.post("/photos", decodeToken, validator.body(photoSchema), async (_req: Request, res: Response) => {
    
    try {
        const newPhotos = _req.body;
        const result = await collections.photos.insertOne(newPhotos);

        result
            ? res.status(201).send(`Successfully created a new photo with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

photosRouter.put("/:id", decodeToken, async (req: Request, res: Response) => {
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

photosRouter.delete("/:id", decodeToken, async (req: Request, res: Response) => {
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