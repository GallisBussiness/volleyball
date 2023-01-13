import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournoiTypeService } from './tournoi-type.service';
import { CreateTournoiTypeDto } from './dto/create-tournoi-type.dto';
import { UpdateTournoiTypeDto } from './dto/update-tournoi-type.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tournoi-type')
export class TournoiTypeController {
  constructor(private readonly tournoiTypeService: TournoiTypeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTournoiTypeDto: CreateTournoiTypeDto) {
    return this.tournoiTypeService.create(createTournoiTypeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tournoiTypeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournoiTypeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournoiTypeDto: UpdateTournoiTypeDto) {
    return this.tournoiTypeService.update(id, updateTournoiTypeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournoiTypeService.remove(id);
  }
}
