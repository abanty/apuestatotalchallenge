import { MedalUserEntity } from "../entities/medal-user.entity";

export interface MedalUserRepository {
    // create(data: Partial<MedalUserEntity>): Promise<MedalUserEntity | null>;
    // findOne(id: string): Promise<MedalUserEntity | null>;
    findAll(user_id: number): Promise<MedalUserEntity[] | null>;
}
