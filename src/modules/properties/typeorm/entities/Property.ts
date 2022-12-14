import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('properties')
export default class Property{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    description: string;
    @Column('decimal')
    price: number;
    @Column()
    city: string;
    @Column()
    street: string;
    @Column()
    district: string;
    @Column('int')
    size: number;
    @Column('int')
    number: number;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn() 
    updated_at: Date;
}