import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { MedalEntity } from '../../domain/entities/medal.entity';
import { MedalRepository } from '../../domain/repositories/medal.repository.interface';


@Injectable()
export class PrismaMedalRepository implements MedalRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findAll(): Promise<MedalEntity[] | null> {
        const allMedals = await this.prisma.medals.findMany();
        return allMedals
    }

}
