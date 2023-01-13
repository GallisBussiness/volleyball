import { forwardRef, Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipe, EquipeSchema } from './entities/equipe.entity';
import { DemandeModule } from 'src/demande/demande.module';
import { TournoiModule } from 'src/tournoi/tournoi.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Equipe.name, useFactory: () => {
    const schema = EquipeSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}]),
  forwardRef(() => DemandeModule) ,
  TournoiModule
],
  controllers: [EquipeController],
  providers: [EquipeService],
  exports: [EquipeService]
})
export class EquipeModule {}
