export class PokemonEntity {
    constructor(
        public id: number,
        public pokemon_id: string | null,
        public user_id: number,
        public pokemon_name: string | null,
        public pokemon_power: string | null,
        public created_at: Date = new Date,
        public updated_at: Date | null,
    ) { }
}
