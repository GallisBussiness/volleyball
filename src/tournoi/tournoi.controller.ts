import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournoiService } from './tournoi.service';
import { CreateTournoiDto } from './dto/create-tournoi.dto';
import { UpdateTournoiDto } from './dto/update-tournoi.dto';
import { CreateAddJoueurDto } from './dto/create-add-joueur.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tournoi')
export class TournoiController {
  constructor(private readonly tournoiService: TournoiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTournoiDto: CreateTournoiDto) {
    return this.tournoiService.create(createTournoiDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/toggle/:id')
  async toogle(@Param('id') id: string,@Body() activeDto: {isActive: boolean}) {
   return this.tournoiService.update(id, {ferme: activeDto.isActive});
  }


  @Get()
  findAll() {
    return this.tournoiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournoiService.findOne(id);
  }

  
  @Get('user/:id')
  findTournoiByJoueur(@Param('id') id: string) {
    return this.tournoiService.findByJoueur(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournoiDto: UpdateTournoiDto) {
    return this.tournoiService.update(id, updateTournoiDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournoiService.remove(id);
  }
}
