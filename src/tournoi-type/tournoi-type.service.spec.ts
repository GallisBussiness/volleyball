import { Test, TestingModule } from '@nestjs/testing';
import { TournoiTypeService } from './tournoi-type.service';

describe('TournoiTypeService', () => {
  let service: TournoiTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournoiTypeService],
    }).compile();

    service = module.get<TournoiTypeService>(TournoiTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
