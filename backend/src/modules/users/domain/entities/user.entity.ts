export class UserEntity {

    constructor(
        public id: number,
        public credential_id: string,
        public password: string,
        public first_name: string,
        public last_name: string | null,
        public email: string,
        public created_at: Date,
        public updated_at: Date | null,
        public status: boolean = true,
        public rol_id: number
    ) { }
}
