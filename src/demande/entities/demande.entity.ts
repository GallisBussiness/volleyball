import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document, Types } from "mongoose";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { Tournoi } from "src/tournoi/entities/tournoi.entity";
import { User } from "src/user/entities/user.entity";

export type DemandeDocument = Demande &Document;

@Schema({timestamps:true})
export class Demande {
    _id: string;
    
    @Prop({type: Types.ObjectId, required: true, ref: Tournoi.name, autopopulate: true})
    @Type(() => Tournoi)
    idTournoi: Tournoi;

    @Prop({type: Types.ObjectId, required: true, ref: Equipe.name, autopopulate: true})
    @Type(() => Equipe)
    idEquipe: Equipe;

    @Prop({type: Types.ObjectId, required: true, ref: User.name, autopopulate: true})
    @Type(() => User)
    idCapitaine: User;

    @Prop({type: Types.ObjectId, required: true, ref: User.name, autopopulate: true})
    @Type(() => User)
    idCoequipier: User;

    @Prop({type: Boolean, required: true, default: false})
    isActive: boolean;
}


export const DemandeSchema = SchemaFactory.createForClass(Demande);