import { Module } from '@nestjs/common';

// CONTROLLER
import { MedalController } from '../interface/controllers/medal.controller';

// PROVIDERS 
import { PrismaService } from 'src/prisma/prisma.services';
import { PrismaMedalRepository } from '../infrastructure/persistence/prisma-medal.repository';

// USE CASES 
import { ReadAllMedalsUseCase } from './use-cases/readAll-medals.use-case';

@Module({
    controllers: [MedalController],
    imports: [],
    providers: [
        PrismaService,
        PrismaMedalRepository,
        ReadAllMedalsUseCase,
        {
            provide: 'MedalRepository',
            useClass: PrismaMedalRepository
        }
    ],
    exports: [ReadAllMedalsUseCase],
})
export class MedalModule { }
