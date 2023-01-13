import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { Tournoi } from "src/tournoi/entities/tournoi.entity";

export type MatchDocument = Match & Document;

@Schema({timestamps: true})
export class Match {
    @Prop({type: String, required: true})
    date: string;

    @Prop({type: String, required: true})
    heure: string;

    @Prop({type: String, required: true})
    lieu: string;

    @Prop({type: Types.ObjectId, ref: Tournoi.name, required: true, autopopulate: true})
    tournoi: Tournoi;

    @Prop({type: Types.ObjectId, ref: Equipe.name, required: true, autopopulate: true})
    equipeA:Equipe;

    @Prop({type: Types.ObjectId, ref: Equipe.name, required: true, autopopulate: true})
    equipeB: Equipe;

    @Prop({type: Number, required: true, default: 0})
    scoreA: number;

    @Prop({type: Number, required: true, default: 0})
    scoreB: number;
}

export const  MatchSchema = SchemaFactory.createForClass(Match);
