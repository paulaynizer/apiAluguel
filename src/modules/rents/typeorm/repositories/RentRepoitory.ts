import Customer from "@modules/customers/typeorm/entities/Customer";
import { EntityRepository, Repository } from "typeorm";
import Rent from "../entities/Rent";

interface IProperty{
    property_id: string;
    price: number;
    quantity: number;
  }
  
  interface IRequest{
    customer: Customer;
    properties: IProperty[];
  
  }
  
  @EntityRepository(Rent)
  export default class RentRepository extends Repository<Rent> {
  
    public async findById(id: string): Promise<Rent | undefined> {
      const rent = this.findOne(id,{
        relations: ['rent_properties', 'customer']
      });
      return rent;
    }
  
    public async createRent({customer, properties} : IRequest): Promise<Rent>{
      const rent = this.create({customer, rent_properties: properties});
      await this.save(rent);
      return rent;
    }
  }