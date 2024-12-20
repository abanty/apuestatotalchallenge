

import { Injectable, Inject } from "@nestjs/common";
import { MedalUserEntity } from "../../domain/entities/medal-user.entity";
import { MedalUserRepository } from "../../domain/repositories/medal-user.repository.interface";
import { SocketManager } from "src/shared/socket/socket-manager.service";

@Injectable()
export class RegisterMedalsUser {
    constructor(
        @Inject('MedalUserRepository')
        private readonly medalUserRepository: MedalUserRepository,
        private readonly socketManager: SocketManager,

    ) { }

    async execute(medals: Partial<MedalUserEntity>): Promise<MedalUserEntity | null> {

        const registerMedals = await this.medalUserRepository.create(medals);

        if (registerMedals) {
            this.socketManager.emitNotificationListening({ notification: registerMedals });
        }

        return registerMedals

    }
}


