import { EntityRepository, Repository } from "typeorm";
import Property from "../entities/Property";

@EntityRepository(Property)
export default class PropertyRespository extends 
    Repository<Property>{
        public async findByName(description: string) 
        : Promise<Property | undefined>{
            const property = await this.findOne({
                where: { description }
            })
            return property;
        }

}