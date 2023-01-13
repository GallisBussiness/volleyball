import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateMatchDto {
    @IsString()
    date: string;

    @IsString()
    heure: string;

    @IsString()
    lieu: string;

    @IsMongoId()
    tournoi: string;

    @IsMongoId()
    equipeA:string;

    @IsMongoId()
    equipeB: string;
}
