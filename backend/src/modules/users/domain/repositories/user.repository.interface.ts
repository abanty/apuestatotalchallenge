import { UserEntity } from "../entities/user.entity";


export interface UserRepository {
    create(credential_id: string, first_name: string, email: string, password: string): Promise<UserEntity>;
    findOne(credential_id: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[] | null>;
    update(users: Partial<UserEntity>): Promise<UserEntity | null>;
}
