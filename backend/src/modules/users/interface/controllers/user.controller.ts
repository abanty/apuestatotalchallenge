import { Controller, Post, Get, Body, Param, HttpException, HttpStatus, Logger, Query, Put } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';

import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    @Post('add')
    async addUser(@Body() body: { credential_id: string; first_name: string; email: string; password: string }) {
        try {
            const response = await this.createUserUseCase.execute(body);
            return response;
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('singin')
    async singin(@Body() body: { credential_id: string; password: string }) {
        try {

            const response = await this.loginUserUseCase.execute(body.credential_id, body.password);
            return response;

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('findOne')
    async findOne(@Body() findAllUser: { email: string; status: boolean }) {

        try {
        } catch (error) {
        }
    }

    @Get('findAll')
    async findAll() {

        try {
        } catch (error) {
            // throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('update')
    async updateUser(@Body() updatedData: Partial<UserEntity>) {
        try {
        } catch (error) {
            // throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


}

