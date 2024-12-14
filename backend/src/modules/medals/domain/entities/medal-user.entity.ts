export class MedalUserEntity {
    constructor(
        public id: number,
        public user_id: number | null,
        public medal_id: number | null,
        public created_at: Date = new Date(),
        public updated_at: Date,
        public status: boolean = false
    ) { }
}
