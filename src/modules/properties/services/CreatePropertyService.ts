import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PropertyRespository from "../typeorm/repositories/PropertyRepository";
import Property from "../typeorm/entities/Property";

interface IRequest{
    description: string;
    price: number;
    city: string;
    street: string;
    number: number;
}

export default class CreatePropertyService{

    public async execute({description, price, city, street, number} : IRequest) :
    Promise<Property>{
        const propertyRepository = 
        getCustomRepository(PropertyRespository);

        const propertyExists = await 
        propertyRepository.findByName(description);
        if(propertyExists){
            throw new AppError('There is already one property' +
            'with this description.');
        }

        const property= propertyRepository.create({
            description, price, city, street, number
        });
        await propertyRepository.save(property);
        return property;
    }

}