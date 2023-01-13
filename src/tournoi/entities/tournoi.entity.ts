import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";
import { TournoiType } from "src/tournoi-type/entities/tournoi-type.entity";
import { User } from "src/user/entities/user.entity";
import { GenreEnum } from "../dto/create-tournoi.dto";
export type TournoiDocument = Tournoi & Document;

@Schema({timestamps: true})
export class Tournoi {

    _id: string;

    @Prop({type: String, required: true, unique: true})
    nom: string;

    @Prop({type: String, required: true})
    date: string;

    @Prop({type: String, required: true})
    dateDeFermiture: string;

    @Prop({type: String, enum: GenreEnum, required: true})
    genre: string;

    @Prop({type: Boolean, required: true, default: false})
    ferme: boolean;

    @Prop({type: [Types.ObjectId], default: []})
    joueurs: string[];

    @Prop({type: Types.ObjectId, required: true, ref: TournoiType.name, autopopulate: true})
    @Type(() => TournoiType)
    type: TournoiType;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: Date, default: null })
    deletedAt: string;
}

export const TournoiSchema = SchemaFactory.createForClass(Tournoi);