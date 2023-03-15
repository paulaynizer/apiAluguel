import Customer from "@modules/customers/typeorm/entities/Customer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RentProperties from "./RentProperties";

@Entity('rents')
export default class Rent{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;
  @OneToMany(()=> RentProperties, rent_properties => rent_properties.rent,{
    cascade: true,
  })
  rent_properties: RentProperties[];

  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}