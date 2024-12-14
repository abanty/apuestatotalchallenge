import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.services";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class PrismaUserRespository implements UserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(credential_id: string, first_name: string, email: string, password: string): Promise<UserEntity> {

        try {

            const createdUser = await this.prisma.users.create({
                data: {
                    credential_id: credential_id,
                    password: password,
                    first_name: first_name,
                    email: email,
                    created_at: new Date(),
                    rol_id: 2 // siempre los que se registraran seran usuarios comunes
                },
            })

            return new UserEntity(
                createdUser.id,
                createdUser.credential_id,
                createdUser.password,
                createdUser.first_name,
                createdUser.last_name,
                createdUser.email,
                createdUser.created_at,
                createdUser.updated_at,
                createdUser.status,
                createdUser.rol_id
            )


        } catch (error) {
            throw new BadRequestException('An error occurred while searching the user.');

        }
    }

    async findOne(credential_id: string): Promise<UserEntity | null> {
        try {


            console.log({ credential_id });


            const signIn = await this.prisma.users.findFirst({
                where: {
                    credential_id: credential_id
                }
            })

            return signIn

        } catch (error) {
            throw new BadRequestException('An error occurred while searching the user.', error);

        }
    }

    async findAll(): Promise<UserEntity[] | null> {
        return null
    }

    async update(users: Partial<UserEntity>): Promise<UserEntity | null> {
        return null
    }
}
