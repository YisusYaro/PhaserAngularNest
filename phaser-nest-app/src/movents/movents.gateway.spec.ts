import { Test, TestingModule } from '@nestjs/testing';
import { MoventsGateway } from './movents.gateway';
import { MoventsService } from './movents.service';

describe('MoventsGateway', () => {
  let gateway: MoventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoventsGateway, MoventsService],
    }).compile();

    gateway = module.get<MoventsGateway>(MoventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
