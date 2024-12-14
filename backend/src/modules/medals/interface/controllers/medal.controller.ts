import { Controller, Patch, Put, Post, Get, Param, Body, Query, HttpException, HttpStatus, ParseIntPipe, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReadAllMedalsUseCase } from '../../application/use-cases/readAll-medals.use-case';

@Controller('medal')
export class MedalController {
    constructor(
        private readonly readAllMedalsUseCase: ReadAllMedalsUseCase
    ) { }

    @Get('findAllMedals')
    async findAllMedals() {
        try {
            const medals = await this.readAllMedalsUseCase.execute();
            return medals
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
