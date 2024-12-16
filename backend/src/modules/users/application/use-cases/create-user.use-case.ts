import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserIdentifierService } from '../../domain/services/user-identifier.service';
import { UserCredentialService } from '../../domain/services/user-credential.service';


@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        private readonly userCredentialService: UserCredentialService,
        private readonly userIdentifierService: UserIdentifierService,
    ) { }

    async execute(login_data: { credential_id: string, first_name: string, email: string, password: string }): Promise<UserEntity> {

        const { first_name, email, password } = login_data
        const ID_CREDENTIAL = this.userIdentifierService.generate();
        const hashedPassword = await this.userCredentialService.encryptPassword(password);

        return this.userRepository.create(ID_CREDENTIAL, first_name, email, hashedPassword);

    }
}
