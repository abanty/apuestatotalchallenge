import { CountPokemonsUseCase } from './count-pokemons.use-case';

describe('CountPokemonsUseCase', () => {
  it('should be defined', () => {
    expect(new CountPokemonsUseCase()).toBeDefined();
  });
});
