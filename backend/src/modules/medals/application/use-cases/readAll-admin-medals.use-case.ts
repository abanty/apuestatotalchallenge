import { Injectable, Inject } from "@nestjs/common";
import { MedalUserEntity } from "../../domain/entities/medal-user.entity";
import { MedalUserRepository } from "../../domain/repositories/medal-user.repository.interface";

@Injectable()
export class ReadAllAdminUserMedalsUseCase {
    constructor(
        @Inject('MedalUserRepository')
        private readonly medalUserRepository: MedalUserRepository
    ) { }

    async execute(): Promise<MedalUserEntity[] | null> {

        const readAlladminMedals = await this.medalUserRepository.findAlladmin()
        return readAlladminMedals

    }

}
