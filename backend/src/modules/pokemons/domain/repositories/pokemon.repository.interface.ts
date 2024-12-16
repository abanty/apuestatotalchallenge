import { PokemonEntity } from "../entities/pokemon.entity";

export interface PokemonRepository {
    countOne(user_id: number): Promise<number | null>;
    create(pokemons: Partial<PokemonEntity[]>): Promise<{ count: number }>;
}
