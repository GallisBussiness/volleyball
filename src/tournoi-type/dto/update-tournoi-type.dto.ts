import { PartialType } from '@nestjs/mapped-types';
import { CreateTournoiTypeDto } from './create-tournoi-type.dto';

export class UpdateTournoiTypeDto extends PartialType(CreateTournoiTypeDto) {}
