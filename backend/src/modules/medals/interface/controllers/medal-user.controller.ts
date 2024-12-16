import { Controller, Patch, Put, Post, Get, Param, Body, Query, HttpException, HttpStatus, ParseIntPipe, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterMedalsUser } from "../../application/use-cases/register-medal.use-case";
import { ReadByUserMedalsUseCase } from "../../application/use-cases/read-by-user-medals.use-case";

import { MedalUserEntity } from "../../domain/entities/medal-user.entity";

@Controller('medal-user')
export class MedalUserController {
    constructor(
        private readonly registerMedalsUser: RegisterMedalsUser,
        private readonly readByUserMedalsUseCase: ReadByUserMedalsUseCase
    ) { }

    @Post('add')
    async addMedals(@Body() body: Partial<MedalUserEntity>) {
        try {
            const medals = await this.registerMedalsUser.execute(body);
            return medals;
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('findAllMedalsByUser/user_id')
    async findAllMedals(@Param() params: { user_id: number }) {
        try {
            const medals = await this.readByUserMedalsUseCase.execute(params.user_id);
            return medals
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

