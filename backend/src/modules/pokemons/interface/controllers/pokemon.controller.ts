


import { Controller, Patch, Put, Post, Get, Param, Body, Query, HttpException, HttpStatus, ParseIntPipe, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { CountPokemonsUseCase } from "../../application/use-cases/count-pokemons.use-case";

@Controller('pokemon')
export class PokemonController {
    constructor(
        private readonly countPokemonsUseCase: CountPokemonsUseCase
    ) { }

    @Get('getTotalPokemons/:user_id')
    async getTotalPokemons(@Param() params: { user_id: number }) {
        try {
            const totalPokemons = await this.countPokemonsUseCase.execute(params.user_id);
            return totalPokemons
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}

