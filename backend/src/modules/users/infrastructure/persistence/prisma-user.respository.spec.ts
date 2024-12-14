import { PrismaUserRespository } from './prisma-user.repository';

describe('PrismaUserRespository', () => {
  it('should be defined', () => {
    expect(new PrismaUserRespository()).toBeDefined();
  });
});
