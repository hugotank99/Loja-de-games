import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],//exportando o modulo categoria como um TypoOrmModule
    controllers: [],
    providers: [],
    exports: [TypeOrmModule]
})
export class categoriaModule{}