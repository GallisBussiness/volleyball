import { IsBoolean, IsEnum, IsMongoId, IsString } from "class-validator";

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

    @IsMongoId()
    type: string;

}

