import express from "express";
import { connectToDatabase } from "./services/database.service";
import { photosRouter } from "../src/routes/photos.router";
import { authRouter } from "../src/routes/auth.router";
import { decodeToken } from './firebase/adminTokens';
import swaggerUi from "swagger-ui-express"; 
import swaggerJsDoc from "swagger-jsdoc";


const app = express();
const port = 8080; // default port to listen

//Documentacion 
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Reto Final Etapa 1',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
      apis: ['./dist/docs/*.js']
}
     


const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(decodeToken)

connectToDatabase()
    .then(() => {        
        app.use("/", photosRouter);
        app.use("/auth", authRouter);
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });