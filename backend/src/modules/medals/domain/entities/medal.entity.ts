export class MedalEntity {
    constructor(
        public id: number,
        public name: string | null,
        public range: number | null,
        public avatar_medal: string | null
    ) { }
}
