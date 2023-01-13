import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateDemandeDto } from './create-demande.dto';

export class UpdateDemandeDto extends PartialType(CreateDemandeDto) {
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
