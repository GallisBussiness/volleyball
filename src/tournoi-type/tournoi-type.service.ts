import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTournoiTypeDto } from './dto/create-tournoi-type.dto';
import { UpdateTournoiTypeDto } from './dto/update-tournoi-type.dto';
import { TournoiType, TournoiTypeDocument } from './entities/tournoi-type.entity';

@Injectable()
export class TournoiTypeService {
  constructor(@InjectModel(TournoiType.name) private tournoiTypeModel: Model<TournoiTypeDocument>) {}


  async create(createTournoiTypeDto: CreateTournoiTypeDto): Promise<TournoiType> {
    try {
      const createdTournoiType = await this.tournoiTypeModel.create(createTournoiTypeDto);
      return await  createdTournoiType.save();
    } catch (error) {
      new HttpException(error.message, 500);
    }
   
  }

  async findAll(): Promise<TournoiType[]> {
    try {
      return await this.tournoiTypeModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<TournoiType> {
    try {
      return await this.tournoiTypeModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateTournoiTypeDto: UpdateTournoiTypeDto): Promise<TournoiType> {
    try {
      return await this.tournoiTypeModel.findByIdAndUpdate(id, updateTournoiTypeDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<TournoiType> {
    try {
      return await this.tournoiTypeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
