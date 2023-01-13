import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Tournoi } from "src/tournoi/entities/tournoi.entity";
import { User } from "src/user/entities/user.entity";

export type EquipeDocument = Equipe & Document;

@Schema({timestamps: true})
export class Equipe {

    _id: string;

    @Prop({type: Types.ObjectId, required: true, ref: Tournoi.name,autopopulate: true})
    idTournoi: string;

    @Prop({type: Types.ObjectId, required: true, ref: User.name,autopopulate: true})
    idCapitaine: User;

    @Prop({type: Types.ObjectId, required: true, ref: User.name,autopopulate: true})
    idCoequipier: User;

    @Prop({type: String, required: true})
    nom: string;

    @Prop({type: Boolean, required: true, default: false})
    isActive: boolean;

    @Prop({type: Boolean, required: true, default: false}) 
    isValidate: boolean;
}

export const EquipeSchema = SchemaFactory.createForClass(Equipe);