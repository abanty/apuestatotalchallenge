import { Injectable, Inject } from "@nestjs/common";
import { MedalEntity } from "../../domain/entities/medal.entity";
import { MedalRepository } from "../../domain/repositories/medal.repository.interface";

@Injectable()
export class ReadAllMedalsUseCase {
    constructor(
        @Inject('MedalRepository')
        private readonly medalRepository: MedalRepository
    ) { }

    async execute(): Promise<MedalEntity[] | null> {

        const readAllMedals = await this.medalRepository.findAll();
        return readAllMedals

    }
}
