
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { PokemonEntity } from '../../domain/entities/pokemon.entity';
import { PokemonRepository } from '../../domain/repositories/pokemon.repository.interface';


@Injectable()
export class PrismaPokemonRepository implements PokemonRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async countOne(user_id: number): Promise<number | null> {

        const totalPokemones = await this.prisma.pokemon_users.count({
            where: {
                user_id: Number(user_id),
            },
        });

        return totalPokemones

    }

}
