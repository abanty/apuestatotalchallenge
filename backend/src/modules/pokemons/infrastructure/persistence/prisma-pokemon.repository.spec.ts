import { PrismaPokemonRepository } from './prisma-pokemon.repository';

describe('PrismaPokemonRepository', () => {
  it('should be defined', () => {
    expect(new PrismaPokemonRepository()).toBeDefined();
  });
});
