import { MedalEntity } from "../entities/medal.entity";

export interface MedalRepository {
    // findOne(id: string): Promise<MedalEntity | null>;
    findAll(): Promise<MedalEntity[] | null>;
}
