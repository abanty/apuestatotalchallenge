import { Test, TestingModule } from '@nestjs/testing';
import { MedalController } from './medal.controller';

describe('MedalController', () => {
  let controller: MedalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedalController],
    }).compile();

    controller = module.get<MedalController>(MedalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
