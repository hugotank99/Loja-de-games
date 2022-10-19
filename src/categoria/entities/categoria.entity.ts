import { IsNotEmpty } from "class-validator";
import { Produto } from "src/Produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'tb_categorias'})//transforma a class exportada em uma entidade
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column ({length:250, nullable:false})
    nome: string;

    @UpdateDateColumn()
    data: Date;

    @OneToMany(() => Produto, (produto)=> produto.categoria,{
        onDelete: 'CASCADE'

    })

    produto: Produto
}


