import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Orders")
export class Orders {

    @PrimaryGeneratedColumn()
    OrderID!: number;

    @Column({
        
    })
    CartID!: number;

    @Column({
        
    })
    UserID!: number;
    
}