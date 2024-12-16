import { Injectable, Inject } from "@nestjs/common";
import { MedalUserEntity } from "../../domain/entities/medal-user.entity";
import { MedalUserRepository } from "../../domain/repositories/medal-user.repository.interface";
import { SocketManager } from "src/shared/socket/socket-manager.service";

@Injectable()
export class UpdateAdminUserMedalsUseCase {
    constructor(
        @Inject('MedalUserRepository')
        private readonly medalUserRepository: MedalUserRepository,
        private readonly socketManager: SocketManager,
    ) { }

    async execute(id: number, user_id: number, status: boolean): Promise<MedalUserEntity | null> {

        const updateAdminMedals = await this.medalUserRepository.updateAdmin(id, user_id, status)

        if (updateAdminMedals) {
            this.socketManager.emitNotificationListening({ notification: updateAdminMedals });
        }

        return updateAdminMedals

    }

}
