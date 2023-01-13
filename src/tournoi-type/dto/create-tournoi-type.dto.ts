import { IsString } from "class-validator";

export class CreateTournoiTypeDto {
    @IsString()
    nom: string; 
}
