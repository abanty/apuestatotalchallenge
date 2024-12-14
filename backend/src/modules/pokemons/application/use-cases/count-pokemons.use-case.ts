


import { Injectable, Inject } from "@nestjs/common";
import { PokemonEntity } from "../../domain/entities/pokemon.entity";
import { PokemonRepository } from "../../domain/repositories/pokemon.repository.interface";

@Injectable()
export class CountPokemonsUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository
    ) { }

    async execute(user_id: number): Promise<number | null> {

        const totalPokemons = await this.pokemonRepository.countOne(user_id);
        return totalPokemons

    }
}
