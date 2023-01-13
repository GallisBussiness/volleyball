import { Module } from '@nestjs/common';
import { TournoiTypeService } from './tournoi-type.service';
import { TournoiTypeController } from './tournoi-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TournoiType, TournoiTypeSchema } from './entities/tournoi-type.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: TournoiType.name, schema: TournoiTypeSchema}])],
  controllers: [TournoiTypeController],
  providers: [TournoiTypeService]
})
export class TournoiTypeModule {}
