import { Test, TestingModule } from '@nestjs/testing';
import { TournoiService } from './tournoi.service';

describe('TournoiService', () => {
  let service: TournoiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournoiService],
    }).compile();

    service = module.get<TournoiService>(TournoiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
