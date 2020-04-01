import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Product")
export class Product {

    @PrimaryGeneratedColumn()
    ProdID!: number;

    @Column({
        length: 200
    })
    Name!: string;

    @Column({
        length: 100
    })
    Description!: string ;
    

    @Column({

    })
    ProdCount!: number;

    @Column({
       
    })
    Price!: number;
    @Column({
       
    })
    CountInCart!: number;
}