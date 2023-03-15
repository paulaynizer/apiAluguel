import RentProperties from "@modules/rents/typeorm/entities/RentProperties";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('properties')
export default class Property{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(()=> RentProperties, rent_properties => rent_properties.property)
    rent_properties: RentProperties[];
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
    @Column('int')
    quantity: number;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn() 
    updated_at: Date;
}