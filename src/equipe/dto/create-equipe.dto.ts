import { IsMongoId, IsString } from "class-validator";

export class CreateEquipeDto {
    @IsMongoId()
    idTournoi: string;

    @IsString()
    nom: string;

    @IsMongoId()
    idCapitaine: string;

    @IsMongoId()
    idCoequipier: string;
}
