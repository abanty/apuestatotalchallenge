import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/application/users.module';
import { MedalModule } from './modules/medals/application/medal.module';
import { PokemonModule } from './modules/pokemons/application/pokemon.module';

@Module({
  imports: [UsersModule, MedalModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
