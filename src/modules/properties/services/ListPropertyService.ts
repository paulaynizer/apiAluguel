import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Property from "../typeorm/entities/Property";
import PropertyRespository from "../typeorm/repositories/PropertyRepository";

export default class ListPropertyService{

    public async execute() : Promise<Property[]>{
        const propertyRepository = 
        getCustomRepository(PropertyRespository);

        const properties = await propertyRepository.find();
        return properties;
    }

}