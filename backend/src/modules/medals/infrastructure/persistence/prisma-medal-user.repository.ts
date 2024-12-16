

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { MedalUserEntity } from '../../domain/entities/medal-user.entity';
import { MedalUserRepository } from '../../domain/repositories/medal-user.repository.interface';


@Injectable()
export class PrismaMedalUserRepository implements MedalUserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }


    async create(medals: Partial<MedalUserEntity>): Promise<MedalUserEntity> {

        const registerMedals = await this.prisma.medals_users.create({
            data: {
                user_id: medals.user_id,
                medal_id: medals.medal_id,
                created_at: new Date(),
                status: false,
            },
        });

        return new MedalUserEntity(
            registerMedals.id,
            registerMedals.user_id,
            registerMedals.medal_id,
            registerMedals.created_at,
            registerMedals.updated_at,
            registerMedals.status,
        );
    }

    async findAll(user_id: number): Promise<any[]> {

        const findAllMedalsUser = await this.prisma.medals_users.findMany({
            where: {
                user_id: Number(user_id)

            },
            orderBy: [
                { id: 'asc' }
            ],
        });

        return findAllMedalsUser
    }

}
