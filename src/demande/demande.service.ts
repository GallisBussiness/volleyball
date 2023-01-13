import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Demande, DemandeDocument } from './entities/demande.entity';

@Injectable()
export class DemandeService {
  constructor(@InjectModel(Demande.name) private DemandeModel: Model<DemandeDocument>) {}


  async create(createDemandeDto: CreateDemandeDto): Promise<Demande> {
    try {
      const createdDemande = await this.DemandeModel.create(createDemandeDto);
      return await  createdDemande.save();
    } catch (error) {
      new HttpException(error.message, 500);
    }
   
  }

  async findAll(): Promise<Demande[]> {
    try {
      return await this.DemandeModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Demande> {
    try {
      return await this.DemandeModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByJoueur(id: string): Promise<Demande[]> {
    try {
      return await (await this.DemandeModel.find()).filter(d => d?.idCoequipier?._id.toString() === id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByTournoiAndEquipe(idT:string,idE: string): Promise<Demande[]> {
    try {
      return await this.DemandeModel.find({idTournoi: idT, idEquipe: idE});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateDemandeDto: UpdateDemandeDto): Promise<Demande> {
    try {
      return await this.DemandeModel.findByIdAndUpdate(id, updateDemandeDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Demande> {
    try {
      return await this.DemandeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async deleteOthersDemande(idT: string,idE: string): Promise<Demande> {
    try {
      const de =  await this.DemandeModel.findOne({idTournoi: idT,idEquipe:idE});
      return await this.remove(de._id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
