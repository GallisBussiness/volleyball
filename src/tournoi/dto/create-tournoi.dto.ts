import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";

export enum GenreEnum {
    HOMME = 'H',
    FEMME = 'F',
    MIXTE = 'X'
}
export class CreateTournoiDto {
    @IsString()
    nom: string;

    @IsString()
    date: string;

    @IsString()
    dateDeFermiture: string;

    @IsEnum(GenreEnum)
    genre: string;

    @IsString()
    type: string;

    @IsNumber()
    nb_equipe_tableau_principal: number;

    @IsNumber()
    dont_w_c_p: number;

    @IsNumber()
    dont_places_r_q: number;

    @IsNumber()
    nb_eq_en_q: number;

    @IsNumber()
    dont_w_e_q: number;

    @IsNumber()
    nb_t_norme: number;

    @IsString()
    date_qualification: string;

    @IsArray()
    date_tableau_principal: string[];

    @IsString()
    formule_sportive_qualification: string;

    @IsString()
    formule_sportive_tableau_principal: string;

    @IsString()
    modele_ballon: string;

    @IsArray()
    membre_locaux: any[];

    @IsString()
    prize_money_par_tableau: string;

    @IsString()
    repartition_prize_money: string;

    @IsString()
    tarif_inscription_par_equipe: string;
}

