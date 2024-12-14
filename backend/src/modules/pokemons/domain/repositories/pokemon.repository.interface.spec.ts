import { PokemonRepository } from './pokemon.repository.interface';

describe('PokemonRepository', () => {
  it('should be defined', () => {
    expect(new PokemonRepository()).toBeDefined();
  });
});
