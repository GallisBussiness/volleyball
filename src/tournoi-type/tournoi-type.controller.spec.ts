import { Test, TestingModule } from '@nestjs/testing';
import { TournoiTypeController } from './tournoi-type.controller';
import { TournoiTypeService } from './tournoi-type.service';

describe('TournoiTypeController', () => {
  let controller: TournoiTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournoiTypeController],
      providers: [TournoiTypeService],
    }).compile();

    controller = module.get<TournoiTypeController>(TournoiTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
