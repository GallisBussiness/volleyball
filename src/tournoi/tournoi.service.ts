import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTournoiDto } from './dto/create-tournoi.dto';
import { UpdateTournoiDto } from './dto/update-tournoi.dto';
import { Tournoi, TournoiDocument } from './entities/tournoi.entity';
import {SoftDeleteModel} from "soft-delete-mongoose-plugin";

@Injectable()
export class TournoiService {
  constructor(@InjectModel(Tournoi.name) private TournoiModel: SoftDeleteModel<TournoiDocument>) {}


  async create(createTournoiDto: CreateTournoiDto): Promise<Tournoi> {
    try {
      const createdTournoi = await this.TournoiModel.create(createTournoiDto);
      return await  createdTournoi.save();
    } catch (error) {
      new HttpException(error.message, 500);
    }
   
  }


  async findAll(): Promise<Tournoi[]> {
    try {
      return await this.TournoiModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Tournoi> {
    try {
      return await this.TournoiModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByJoueur(id: string): Promise<Tournoi[]> {
    try {
      return await  (await this.TournoiModel.find()).filter(t => t.joueurs.includes(id));
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async restoreJoueur(): Promise<Tournoi[]> {
    try {
      return await this.TournoiModel.find({isDeleted : true});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async addJoueur(idT: string, idJ: string): Promise<Tournoi> {
    try {
      const t =  await this.TournoiModel.findById(idT);
      t.joueurs.push(idJ);
      return await t.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateTournoiDto: UpdateTournoiDto): Promise<Tournoi> {
    try {
      return await this.TournoiModel.findByIdAndUpdate(id, updateTournoiDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Tournoi> {
    try {
      return await this.TournoiModel.findByIdAndSoftDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
