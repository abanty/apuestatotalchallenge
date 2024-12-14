
import { Injectable, Inject } from "@nestjs/common";
import { MedalEntity } from "../../domain/entities/medal.entity";
import { MedalRepository } from "../../domain/repositories/medal.repository.interface";

@Injectable()
export class CountMedalsUser {
    constructor(
        @Inject('MedalRepository')
        private readonly medalRepository: MedalRepository
    ) { }

    async execute(user_id: number): Promise<MedalEntity[] | null> {

        // const readAllMedals = await this.medalRepository.findAll(user_id);
        return null

    }
}
