import { Injectable, Inject } from "@nestjs/common";
import { MedalUserEntity } from "../../domain/entities/medal-user.entity";
import { MedalUserRepository } from "../../domain/repositories/medal-user.repository.interface";

@Injectable()
export class ReadByUserMedalsUseCase {
    constructor(
        @Inject('MedalUserRepository')
        private readonly medalUserRepository: MedalUserRepository
    ) { }

    async execute(user_id: number): Promise<MedalUserEntity[] | null> {

        const readByUserMedals = await this.medalUserRepository.findAll(user_id)
        return readByUserMedals

    }

}
