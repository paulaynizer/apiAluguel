import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Property from "../typeorm/entities/Property";
import PropertyRespository from "../typeorm/repositories/PropertyRepository";

interface IRequest{
    id: string;
    description: string;
    price: number;
    city: string;
    street: string;
    district: string;
    size: number;
    number: number;
    quantity: number;
}

export default class UpdatePropertyService{

    public async execute({id, description, price, city, street, district, size, number, quantity} : IRequest) :
     Promise<Property>{
        const propertyRepository = 
        getCustomRepository(PropertyRespository);

        const property = await propertyRepository.findOne(id);
        if(!property){
            throw new AppError('Property not found.');
        }

        const propertyExists = await propertyRepository.findByName(description);
        if(propertyExists && description != property.description){
            throw new AppError('There is already one property' +
            'with this name.');
        }

        property.description = description;
        property.price = price;
        property.city = city;
        property.street = street;
        property.number = number;
        property.district = district;
        property.size = size;
        property.quantity =quantity;

        await propertyRepository.save(property);

        return property;
    }

}