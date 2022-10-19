import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private ProdutoRepository: Repository<Produto>,
        private CategoriaService: CategoriaService
    ) { }
    
    async findAll(): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            relations:{
                categoria: true                
            }
        });
    }
    async findById(id: number):Promise<Produto>{
        let produto = await this.ProdutoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria:true
            }
        });
        if (!produto)
            throw new HttpException('Produto não encontrado',HttpStatus.NOT_FOUND)

        return produto;
    }
    async findByNome(nome: string): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true
            }
        });
    }
    async create (produto: Produto): Promise<Produto> {
        if (produto.categoria) {
            let Categoria = await this.CategoriaService.findById(produto.categoria.id)

            if (!Categoria) 
                throw new HttpException('Categoria não encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.ProdutoRepository.save(produto);
    }
    async update(produto:Produto): Promise<Produto> {
        let BuscarProduto = await this.findById(produto.id)

        if (!BuscarProduto || !Produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)

        if (produto.categoria) {
            let categoria = await this.CategoriaService.findById(produto.categoria.id)

        if (!categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.save(produto);
        }
    }
    async Delete(id: number):Promise<DeleteResult> {
        let BuscarProduto = await this.findById(id)

        if (!BuscarProduto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.delete(id);
    }

}
