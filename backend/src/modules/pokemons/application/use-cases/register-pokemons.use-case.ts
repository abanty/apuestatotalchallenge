
import { Injectable, Inject } from "@nestjs/common";
import { PokemonEntity } from "../../domain/entities/pokemon.entity";
import { PokemonRepository } from "../../domain/repositories/pokemon.repository.interface";

@Injectable()
export class RegisterPokemonsUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository
    ) { }

    async execute(pokemons: Partial<PokemonEntity[]>): Promise<{ count: number }> {

        const addPokemons = await this.pokemonRepository.create(pokemons);
        return addPokemons

    }
}
