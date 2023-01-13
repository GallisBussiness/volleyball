import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './entities/match.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Match.name, useFactory: () => {
    const schema = MatchSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}])],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
