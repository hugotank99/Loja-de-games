import { IsNotEmpty } from "class-validator"
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @Column ({length: 250, nullable: false })
    nome: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne (()=> Categoria,(categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })

    categoria: Categoria
}