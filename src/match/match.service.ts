import { Injectable,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match, MatchDocument } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(@InjectModel(Match.name) private MatchModel: Model<MatchDocument>) {}


  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    try {
      const createdMatch = await this.MatchModel.create(createMatchDto);
      return await  createdMatch.save();
    } catch (error) {
      new HttpException(error.message, 500);
    }
   
  }


  async findAll(): Promise<Match[]> {
    try {
      return await this.MatchModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByJoueur(id: string): Promise<Match[]> {
    try {
      return await (await this.MatchModel.find())
      .filter(m => ((m.equipeA.idCapitaine._id.toString() === id) || (m.equipeA.idCoequipier._id.toString() === id)) || ((m.equipeB.idCapitaine._id.toString() === id) || (m.equipeB.idCoequipier._id.toString() === id)));
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Match> {
    try {
      return await this.MatchModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    try {
      return await this.MatchModel.findByIdAndUpdate(id, updateMatchDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Match> {
    try {
      return await this.MatchModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
