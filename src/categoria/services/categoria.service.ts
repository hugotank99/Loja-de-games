import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations:{
                produto: true
            }
        })
    }

    async findById(id: number): Promise<Categoria>{
        let Categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                produto: true
            }
        })

        if (!Categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)
            return Categoria
    }

    async findByNome(nome: string): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{
                nome: ILike (`%${nome}%`)
            },
            relations: {
                produto: true
            }
        });
    }

    async create (categoria:Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }
    async update (categoria: Categoria): Promise<Categoria>{
        let BuscaCategoria = await this.findById(categoria.id);

        if (!BuscaCategoria || !categoria.id)
        throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.save(categoria);
    }
    async Delete(id: number): Promise<DeleteResult> {
        let BuscaCategoria = await this.findById(id);

        if (!BuscaCategoria)
        throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);
    }

}
