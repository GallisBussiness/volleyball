import { Module } from '@nestjs/common';
import { TournoiService } from './tournoi.service';
import { TournoiController } from './tournoi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournoi, TournoiSchema } from './entities/tournoi.entity';
import { SoftDelete } from 'soft-delete-mongoose-plugin';
const IS_DELETED_FIELD = 'isDeleted';
const DELETED_AT_FIELD = 'deletedAt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{name: Tournoi.name, useFactory: () => {
      const schema = TournoiSchema;
      schema.plugin(require('mongoose-autopopulate'));
      schema.plugin(new SoftDelete({
        isDeletedField: IS_DELETED_FIELD,
        deletedAtField: DELETED_AT_FIELD,
      }).getPlugin())
      return schema;
    }}])
  ],
  controllers: [TournoiController],
  providers: [TournoiService],
  exports: [TournoiService]
})
export class TournoiModule {}
