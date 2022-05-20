import { ObjectId } from "mongodb";

export default interface Photos {
    albumId: number;
    idPhotos: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    id?: ObjectId;
}

