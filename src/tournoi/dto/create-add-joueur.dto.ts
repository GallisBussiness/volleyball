import { IsMongoId } from "class-validator";

export class CreateAddJoueurDto {
    @IsMongoId()
    joueur: string;
}