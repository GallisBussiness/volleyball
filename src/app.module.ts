import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './user/user.module';
import { TournoiModule } from './tournoi/tournoi.module';
import { TournoiTypeModule } from './tournoi-type/tournoi-type.module';
import { DemandeModule } from './demande/demande.module';
import { MatchModule } from './match/match.module';
import { EquipeModule } from './equipe/equipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TournoiModule,
    TournoiTypeModule,
    DemandeModule,
    MatchModule,
    EquipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/loginadmin', method: RequestMethod.POST },
      { path: 'user/loginjoueur', method: RequestMethod.POST },
      { path: 'user/joueurs/create', method: RequestMethod.POST },
      { path: 'tournoi', method: RequestMethod.GET },
      { path: 'equipe', method: RequestMethod.GET }
      )
      .forRoutes('*');
  }
}
