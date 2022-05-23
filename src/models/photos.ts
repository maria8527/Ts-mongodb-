import { ObjectId } from "mongodb";

export default interface Photos {
    albumId: number; 
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    _id?: ObjectId;
}

