import { IsEnum, IsMongoId } from "class-validator";

export class CreateDemandeDto {
    @IsMongoId()
    idTournoi: string;

    @IsMongoId()
    idEquipe: string;

    @IsMongoId()
    idCapitaine: string;

    @IsMongoId()
    idCoequipier: string;

}
