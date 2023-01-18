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

    @Prop({type: String, required: true})
    type: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: Date, default: null })
    deletedAt: string;

    @Prop({type: Number, required: true})
    nb_equipe_tableau_principal: number;

    @Prop({type: Number, required: true})
    dont_w_c_p: number;

    @Prop({type: Number, required: true})
    dont_places_r_q: number;

    @Prop({type: Number, required: true})
    nb_eq_en_q: number;

    @Prop({type: Number, required: true})
    dont_w_e_q: number;

    @Prop({type: Number, required: true})
    nb_t_norme: number;
    
    @Prop({type: String, required: true})
    date_qualification: string;

    @Prop({type: Array, required: true})
    date_tableau_principal: string[];

    @Prop({type: String, required: true})
    formule_sportive_qualification: string;

    @Prop({type: String, required: true})
    formule_sportive_tableau_principal: string;

    @Prop({type: String, required: true})
    modele_ballon: string;

    @Prop({type: Array, required: true})
    membre_locaux: any[];

    @Prop({type: String, required: true})
    prize_money_par_tableau: string;

    @Prop({type: String, required: true})
    repartition_prize_money: string;

    @Prop({type: String, required: true})
    tarif_inscription_par_equipe: string;
}

export const TournoiSchema = SchemaFactory.createForClass(Tournoi);