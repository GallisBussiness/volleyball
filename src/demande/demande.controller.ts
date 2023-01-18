import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EquipeService } from 'src/equipe/equipe.service';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';

@Controller('demande')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService, private readonly equipeService: EquipeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.demandeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/accept/:id')
  async accept(@Param('id') id: string,@Body() activeDto: {isActive: boolean}) {
    const dem = await this.demandeService.update(id,activeDto);
    await this.equipeService.update(dem.idEquipe._id,activeDto);
    await this.demandeService.remove(dem._id);
    const eq = await this.equipeService.deleteOthersEquipe(dem.idTournoi._id,dem.idCoequipier._id);
    if(eq) {
       await this.demandeService.deleteOthersDemande(dem.idTournoi._id, eq._id);
    }
    return dem;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/joueur/:id')
  findByJoueur(@Param('id') id: string) {
    return this.demandeService.findByJoueur(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandeDto: UpdateDemandeDto) {
    return this.demandeService.update(id, updateDemandeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeService.remove(id);
  }
}
