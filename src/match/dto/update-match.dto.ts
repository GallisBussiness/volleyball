import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateMatchDto } from './create-match.dto';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
    @IsOptional()
    @IsNumber()
    scoreA?: number;

    @IsOptional()
    @IsNumber()
    scoreB?: number;
}
