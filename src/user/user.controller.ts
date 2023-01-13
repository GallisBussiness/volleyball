import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Action } from 'src/casl/casl-ability.factory';
import { CaslGuard } from 'src/casl/casl.guard';
import { User, USER_ROLE } from './entities/user.entity';
import { CheckAbility } from 'src/casl/policy.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('loginadmin')
  @UseGuards(AuthGuard('local'))
  async loginadmin(@Req() req): Promise<any> {
    if(req?.user?.role?.includes(USER_ROLE.ADMIN)) {
      return this.authService.login(req.user);
    }
     throw new UnauthorizedException();
  }

  @Post('loginjoueur')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<any> {
  if(req?.user?.role?.includes(USER_ROLE.JOUEUR)) {
    return this.authService.login(req.user);
  }
   throw new UnauthorizedException();
  }

@Post('joueurs/create')
  async createjoueur(@Body() createUserDto: CreateUserDto) {
    const joueur = await this.userService.createjoueur(createUserDto);
    return this.authService.login(joueur);
  }

  @Post('joueurs/setactive/:id')
  async setactivejoueur(@Param('id') id: string,@Body() activeDto: {isActive: boolean}) {
    return  await this.userService.update(id,activeDto);
  }


  @CheckAbility({ action: Action.Create, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(CaslGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('joueurs/getall')
  findAllJoueur() {
    return this.userService.findAllJoueur();
  }
  
  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(CaslGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Get('joueurs/getone/:id')
  findOneJoueur(@Param('id') id: string) {
    return this.userService.findOneJoueur(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


   

  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Patch('joueurs/update/:id')
  updateJoueur(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateJoueur(id, updateUserDto);
  }


  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Delete('joueurs/delete/:id')
  removeJoueur(@Param('id') id: string) {
    return this.userService.removeJoueur(id);
  }

  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}
