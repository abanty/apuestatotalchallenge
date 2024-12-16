import { Controller, Patch, Put, Post, Get, Param, Body, Query, HttpException, HttpStatus, ParseIntPipe, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterMedalsUser } from "../../application/use-cases/register-medal.use-case";
import { ReadByUserMedalsUseCase } from "../../application/use-cases/read-by-user-medals.use-case";
import { ReadAllAdminUserMedalsUseCase } from "../../application/use-cases/readAll-admin-medals.use-case";
import { UpdateAdminUserMedalsUseCase } from "../../application/use-cases/update-admin-medals.use-case";

import { MedalUserEntity } from "../../domain/entities/medal-user.entity";

@Controller('medal-user')
export class MedalUserController {
    constructor(
        private readonly registerMedalsUser: RegisterMedalsUser,
        private readonly readByUserMedalsUseCase: ReadByUserMedalsUseCase,
        private readonly readAllAdminUserMedalsUseCase: ReadAllAdminUserMedalsUseCase,
        private readonly updateAdminUserMedalsUseCase: UpdateAdminUserMedalsUseCase,
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

    @Get('findAllMedalsByUser/:user_id')
    async findAllMedals(@Param() params: { user_id: number }) {
        try {

            console.log({ params });

            const medals = await this.readByUserMedalsUseCase.execute(params.user_id);
            return medals

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('findAllMedalsByAdmin')
    async findAllAdminMedals() {
        try {
            const medalsAdmin = await this.readAllAdminUserMedalsUseCase.execute();
            return medalsAdmin
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('updateAdmin')
    async updateCategories(
        @Body() medals: Partial<MedalUserEntity>,
    ) {
        try {
            const updateAdminMedals = await this.updateAdminUserMedalsUseCase.execute(medals.id, medals.user_id, medals.status);
            return updateAdminMedals;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

