import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateTournoiDto } from './create-tournoi.dto';

export class UpdateTournoiDto extends PartialType(CreateTournoiDto) {
    @IsBoolean()
    ferme: boolean;
}
