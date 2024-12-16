import { Module } from '@nestjs/common';

// CONTROLLER
import { MedalController } from '../interface/controllers/medal.controller';
import { MedalUserController } from '../interface/controllers/medal-user.controller';

// PROVIDERS 
import { PrismaService } from 'src/prisma/prisma.services';
import { PrismaMedalRepository } from '../infrastructure/persistence/prisma-medal.repository';
import { PrismaMedalUserRepository } from '../infrastructure/persistence/prisma-medal-user.repository';
// USE CASES 
import { ReadAllMedalsUseCase } from './use-cases/readAll-medals.use-case';
import { RegisterMedalsUser } from './use-cases/register-medal.use-case';
import { ReadByUserMedalsUseCase } from './use-cases/read-by-user-medals.use-case';
@Module({
    controllers: [MedalController, MedalUserController],
    imports: [],
    providers: [
        PrismaService,
        PrismaMedalRepository,
        PrismaMedalUserRepository,
        RegisterMedalsUser,
        ReadByUserMedalsUseCase,
        ReadAllMedalsUseCase,
        {
            provide: 'MedalRepository',
            useClass: PrismaMedalRepository,
        },
        {
            provide: 'MedalUserRepository',
            useClass: PrismaMedalUserRepository,
        }
    ],
    exports: [ReadAllMedalsUseCase, RegisterMedalsUser, ReadByUserMedalsUseCase],
})
export class MedalModule { }
