import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Property from "../typeorm/entities/Property";
import PropertyRespository from "../typeorm/repositories/PropertyRepository";

interface IRequest{
    id: string;
}

export default class DeletePropertyService{

    public async execute({id} : IRequest) : Promise<void>{
        const propertyRepository = getCustomRepository(PropertyRespository);

        const property = await propertyRepository.findOne(id);
        if(!property){
            throw new AppError('Property not found.');
        }

        await propertyRepository.remove(property);

    }

}