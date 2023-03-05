import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PropertyRespository from "../typeorm/repositories/PropertyRepository";
import Property from "../typeorm/entities/Property";

interface IRequest{
    description: string;
    price: number;
    city: string;
    street: string;
    district: string;
    size: number;
    number: number;
}

export default class CreatePropertyService{

    public async execute({description, price, city, street, district, size, number} : IRequest) :
    Promise<Property>{
        const propertiesRepository = getCustomRepository(PropertyRespository);

        const propertyExists = await propertiesRepository.findByName(description);
        if(propertyExists){
            throw new AppError('There is already one property' +
            'with this name.');
        }

        const properties = propertiesRepository.create({
            description, price, city, street, district, size, number
        });
        await propertiesRepository.save(properties);
        return properties;
    }

}