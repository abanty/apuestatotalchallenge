import { Module } from '@nestjs/common';

// CONTROLLER
import { PokemonController } from '../interface/controllers/pokemon.controller';

// PROVIDERS 
import { PrismaService } from 'src/prisma/prisma.services';
import { PrismaPokemonRepository } from '../infrastructure/persistence/prisma-pokemon.repository';

// USE CASES 
import { CountPokemonsUseCase } from './use-cases/count-pokemons.use-case';

@Module({
    controllers: [PokemonController],
    imports: [],
    providers: [
        PrismaService, 
        PrismaPokemonRepository, 
        CountPokemonsUseCase,
        {
            provide: 'PokemonRepository',
            useClass: PrismaPokemonRepository
        }
    ],
    exports: [],
})
export class PokemonModule { }
