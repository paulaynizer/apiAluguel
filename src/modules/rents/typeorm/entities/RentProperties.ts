
import Property from "@modules/properties/typeorm/entities/Property";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import Rent from "./Rent";

@Entity('rents_properties')
export default class RentProperties{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> Rent, rent => rent.rent_properties)
  @JoinColumn({name: 'rent_id'}) //
  rent: Rent;
  @ManyToOne(()=> Property, property => property.rent_properties)
  @JoinColumn({name: 'property_id'}) //
  property: Property;
  @Column()
  order_id: string;
  @Column()
  property_id: string;
  @Column('decimal')
  price: number;
  @Column('int')
  quantity: number;
  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}