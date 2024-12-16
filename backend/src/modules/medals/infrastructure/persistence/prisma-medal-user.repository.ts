

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


        console.log({ medals });


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
                user_id: Number(user_id),
                status:true
            },
            include:{
                medals:true
            },
            orderBy: [
                { id: 'asc' }
            ],
        });

        return findAllMedalsUser
    }

    async findAlladmin(): Promise<any[]> {

        const findAllMedalsAdmin = await this.prisma.medals_users.findMany({
            orderBy: [
                { id: 'desc' }
            ],
            include: {
                users: true,
                medals: true
            }
        });

        return findAllMedalsAdmin
    }

    async updateAdmin(id: number, user_id: number, status: boolean): Promise<MedalUserEntity> {

        const updateMedalAdmin = await this.prisma.medals_users.update({
            where: {
                id: id,
                user_id: user_id
            },
            data: {
                status: status,
            },
        });

        return new MedalUserEntity(
            updateMedalAdmin.id,
            updateMedalAdmin.user_id,
            updateMedalAdmin.medal_id,
            updateMedalAdmin.created_at,
            updateMedalAdmin.updated_at,
            updateMedalAdmin.status
        );
    }

}
