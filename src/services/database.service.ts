import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import photos from '../models/photos';

export const collections: { photos?: mongoDB.Collection<photos>} = {};

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const photosCollection = db.collection<photos>(process.env.PHOTOS_COLLECTION_NAME);
 
  collections.photos = photosCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${photosCollection.collectionName}`);
         
 }
