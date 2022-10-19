import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { categoriaModule } from './categoria/categoria.module';
import { Produto } from './Produto/entities/produto.entity';

//placa mãe

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'tb_lojagame',
      entities: [ Categoria,Produto ],
      synchronize: true
    }),
    categoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
