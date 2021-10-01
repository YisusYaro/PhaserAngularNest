import { Test, TestingModule } from '@nestjs/testing';
import { MoventsService } from './movents.service';

describe('MoventsService', () => {
  let service: MoventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoventsService],
    }).compile();

    service = module.get<MoventsService>(MoventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
