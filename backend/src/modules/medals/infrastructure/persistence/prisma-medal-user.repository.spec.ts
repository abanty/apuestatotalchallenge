import { PrismaMedalUserRepository } from './prisma-medal-user.repository';

describe('PrismaMedalUserRepository', () => {
  it('should be defined', () => {
    expect(new PrismaMedalUserRepository()).toBeDefined();
  });
});
