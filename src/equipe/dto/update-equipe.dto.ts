import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateEquipeDto } from './create-equipe.dto';

export class UpdateEquipeDto extends PartialType(CreateEquipeDto) {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isValidate?: boolean;
}
