import express from "express";
import { connectToDatabase } from "./services/database.service";
import { photosRouter } from "../src/routes/photos.router";
import { decodeToken } from './firebase/adminTokens';

const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(decodeToken)

connectToDatabase()
    .then(() => {        
        app.use("/", photosRouter);
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });