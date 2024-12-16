import { RegisterPokemonsUserCase } from './register-pokemons.use-case';

describe('RegisterPokemonsUserCase', () => {
  it('should be defined', () => {
    expect(new RegisterPokemonsUserCase()).toBeDefined();
  });
});
