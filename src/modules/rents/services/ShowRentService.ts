import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Rent from "../typeorm/entities/Rent";
import RentRepository from "../typeorm/repositories/RentRepoitory";

interface IRequest{
    id: string;
  
  }
  
  export default class ShowRentService{
  
    public async execute({id}: IRequest) : Promise<Rent>{
      const rentsRepository = getCustomRepository(RentRepository);
      const rent = await rentsRepository.findById(id);
      if(!rent){
        throw new AppError('Rent not find.');
      }
  
      return rent;
  
    }
  }
  