import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserGTO } from './user.gto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(){
    return this.usersService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: number){
    return this.usersService.getOne(Number(id))
  }

  @Post()
  async create(@Body() data: UserGTO){
    return this.usersService.create(data)
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() data:UserGTO){
    return this.usersService.update(data, Number(id))
  }

  @Delete(':id')
    async delete(@Param('id') id:number){
      return this.usersService.delete(Number(id))
  }
}
