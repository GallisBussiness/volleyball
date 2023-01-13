import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { Equipe, EquipeDocument } from './entities/equipe.entity';

@Injectable()
export class EquipeService {
  constructor(@InjectModel(Equipe.name) private EquipeModel: Model<EquipeDocument>) {}


  async create(createEquipeDto: CreateEquipeDto): Promise<Equipe> {
    try {
      const createdEquipe = await this.EquipeModel.create(createEquipeDto);
      return await  createdEquipe.save();
    } catch (error) {
      new HttpException(error.message, 500);
    }
   
  }


  async findAll(): Promise<Equipe[]> {
    try {
      return await this.EquipeModel.find({isActive: true});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByTournoi(id: string): Promise<Equipe[]> {
    try {
      return await this.EquipeModel.find({idTournoi: id, isValidate: true});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByJoueur(id: string): Promise<Equipe[]> {
    try {
      return await this.EquipeModel.find({$or: [{idCapitaine:id},{idCoequipier: id}]})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Equipe> {
    try {
      return await this.EquipeModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateEquipeDto: UpdateEquipeDto): Promise<Equipe> {
    try {
      return await this.EquipeModel.findByIdAndUpdate(id, updateEquipeDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Equipe> {
    try {
      return await this.EquipeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async deleteOthersEquipe(idT: string,idC: string): Promise<Equipe> {
    try {
      const eq =  await this.EquipeModel.findOne({idCapitaine: idC.toString(),idTournoi:idT.toString(),isActive: false});
      return await this.remove(eq._id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
