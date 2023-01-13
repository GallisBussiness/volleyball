import { forwardRef, Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Demande, DemandeSchema } from './entities/demande.entity';
import { EquipeModule } from 'src/equipe/equipe.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Demande.name, useFactory: () => {
    const schema = DemandeSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}]),
  forwardRef(() => EquipeModule)
],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [DemandeService],
})
export class DemandeModule {}
