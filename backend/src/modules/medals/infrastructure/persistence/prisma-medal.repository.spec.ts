import { PrismaMedalRepository } from './prisma-medal.repository';

describe('PrismaMedalRepository', () => {
  it('should be defined', () => {
    expect(new PrismaMedalRepository()).toBeDefined();
  });
});
