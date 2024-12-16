

import { Injectable, Inject } from "@nestjs/common";
import { MedalUserEntity } from "../../domain/entities/medal-user.entity";
import { MedalUserRepository } from "../../domain/repositories/medal-user.repository.interface";

@Injectable()
export class RegisterMedalsUser {
    constructor(
        @Inject('MedalUserRepository')
        private readonly medalUserRepository: MedalUserRepository
    ) { }

    async execute(medals: Partial<MedalUserEntity>): Promise<MedalUserEntity | null> {

        const registerMedals = await this.medalUserRepository.create(medals);
        return registerMedals

    }
}


