import { PokemonEntity } from './pokemon.entity';

describe('PokemonEntity', () => {
  it('should be defined', () => {
    expect(new PokemonEntity()).toBeDefined();
  });
});
