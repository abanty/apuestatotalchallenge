import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserCredentialService } from '../../domain/services/user-credential.service';
import { UserTokenService } from '../../domain/services/user-token.service';

@Injectable()
export class LoginUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        private readonly userCredentialService: UserCredentialService,
        private readonly userTokenService: UserTokenService,

    ) { }

    async execute(credential_id: string, password: string): Promise<any> {

        const userData = await this.userRepository.findOne(credential_id);

        if (!userData) {
            return {
                msg: "El usuario no existe.",
                user: null,
                token: null
            };
        }

        console.log({ userData });


        const isPasswordValid = await this.userCredentialService.verifyPassword(password, userData?.password);

        if (!isPasswordValid) {
            return {
                msg: "Contraseña incorrecta, intentalo nuevamnete.",
                user: null,
                token: null
            }
        }

        const tokenReturn = await this.userTokenService.encode(userData.id, userData.email, userData.status);

        return {
            msg: 'success',
            user: userData,
            token: tokenReturn
        };


    }
}
