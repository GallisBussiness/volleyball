import { Test, TestingModule } from '@nestjs/testing';
import { TournoiController } from './tournoi.controller';
import { TournoiService } from './tournoi.service';

describe('TournoiController', () => {
  let controller: TournoiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournoiController],
      providers: [TournoiService],
    }).compile();

    controller = module.get<TournoiController>(TournoiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
