import { Module } from '@nestjs/common';

// PROVIDERS
import { PrismaService } from 'src/prisma/prisma.services';
import { PrismaUserRespository } from '../infrastructure/persistence/prisma-user.respository';

// CONTROLLERS
import { UserController } from '../interface/controllers/user.controller';

// USES CASES
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { LoginUserUseCase } from './use-cases/login-user.use-case';

// SERVICES
import { UserIdentifierService } from '../domain/services/user-identifier.service';
import { UserCredentialService } from '../domain/services/user-credential.service';

import { UserTokenService } from '../domain/services/user-token.service';


@Module({
    controllers: [UserController],
    imports: [],
    providers: [
        PrismaService,
        CreateUserUseCase,
        LoginUserUseCase,
        UserIdentifierService,
        UserTokenService,
        UserCredentialService,
        {
            provide: 'UserRepository',
            useClass: PrismaUserRespository,
        }
    ],
    exports: [CreateUserUseCase,
        LoginUserUseCase]
})
export class UsersModule { }
