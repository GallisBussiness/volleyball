import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { DemandeService } from 'src/demande/demande.service';
import { TournoiService } from 'src/tournoi/tournoi.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService, private readonly demandeService: DemandeService, private readonly tournoiService: TournoiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createEquipeDto: CreateEquipeDto) {
    const eq = await this.equipeService.create(createEquipeDto);
    await this.demandeService.create({idCapitaine: eq.idCapitaine._id,idCoequipier: eq.idCoequipier._id,idEquipe: eq._id,idTournoi: eq.idTournoi});
    await this.tournoiService.addJoueur(eq.idTournoi,eq.idCapitaine._id);
    return eq;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/validate/:id')
  async accept(@Param('id') id: string,@Body() activeDto: {isActive: boolean}) {
   return this.equipeService.update(id, {isValidate:activeDto.isActive});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/bytournoi/:id')
  findEquipeByTournoi(@Param('id') id: string) {
    return this.equipeService.findByTournoi(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/joueur/:id')
  findEquipeByJoueur(@Param('id') id: string) {
    return this.equipeService.findByJoueur(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipeDto: UpdateEquipeDto) {
    return this.equipeService.update(id, updateEquipeDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.remove(id);
  }
}
