import { ParseIntPipe } from "@nestjs/common";
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller('/Produto')
export class ProdutoController {
    constructor (private readonly ProdutoServide: ProdutoService) 
    {  }
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.ProdutoServide.findAll();
    }
    @Get ('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)id : number): Promise<Produto> {
        return this.ProdutoServide.findById(id);
    }
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Produto[]> {
        return this.ProdutoServide.findByNome(nome);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()produto: Produto): Promise<Produto> {
        return this.ProdutoServide.create(produto)
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()produto: Produto): Promise<Produto> {
        return this.ProdutoServide.update(produto)
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id',ParseIntPipe)id: number) {
        return this.ProdutoServide.Delete(id)
    }
}