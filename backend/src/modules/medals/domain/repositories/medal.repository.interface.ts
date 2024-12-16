import { MedalEntity } from "../entities/medal.entity";

export interface MedalRepository {
    findAll(): Promise<MedalEntity[] | null>;
}
