import { Test, TestingModule } from '@nestjs/testing';
import { MedalUserController } from './medal-user.controller';

describe('MedalUserController', () => {
  let controller: MedalUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedalUserController],
    }).compile();

    controller = module.get<MedalUserController>(MedalUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
