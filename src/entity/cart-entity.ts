import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cart")
export class Cart {

    @PrimaryGeneratedColumn()
    CartID!: number;

    @Column({
        
    })
    ProdID!: number;

    @Column({
        length: 100
    })
    UserId!: string ;

    @Column({

    })
    Quantity!: number;

    @Column({

    })
    IsOrdered!: boolean;
    
}