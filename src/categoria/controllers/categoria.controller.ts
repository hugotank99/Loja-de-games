import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Body, Delete } from "@nestjs/common/decorators";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller("/categoria")
export class CategoriaController {
    constructor(private readonly CategoriaService: CategoriaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Categoria[]> {
        return this.CategoriaService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise <Categoria> {
        return this.CategoriaService.findById(id);
    }
    @Get('/Nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('Nome')nome: string): Promise<Categoria[]> {
        return this.CategoriaService.findByNome(nome);
    }
    @Post()
    @HttpCode(HttpStatus.OK)
    update(@Body()Categoria: Categoria): Promise<Categoria> {
        return this.CategoriaService.update(Categoria);
    }
    @Delete ('/:id')
    @HttpCode(HttpStatus.OK)
    Delete(@Param('id',ParseIntPipe)id: number) {
        return this.CategoriaService.Delete(id)
    }
}