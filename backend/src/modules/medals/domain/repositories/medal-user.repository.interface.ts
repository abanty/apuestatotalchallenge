import { MedalUserEntity } from "../entities/medal-user.entity";

export interface MedalUserRepository {
    create(medals: Partial<MedalUserEntity>): Promise<MedalUserEntity | null>;
    findAll(user_id: number): Promise<MedalUserEntity[] | null>;
    findAlladmin(): Promise<MedalUserEntity[] | null>;
    updateAdmin(id: number, user_id: number, status: boolean): Promise<MedalUserEntity | null>
    // findOne(id: string): Promise<MedalUserEntity | null>;
}
