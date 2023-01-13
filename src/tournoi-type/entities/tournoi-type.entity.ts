import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TournoiTypeDocument = TournoiType & Document;

@Schema({timestamps: true})
export class TournoiType {
    @Prop({type: String, required: true, unique: true})
    nom: string;
}

export const TournoiTypeSchema = SchemaFactory.createForClass(TournoiType);