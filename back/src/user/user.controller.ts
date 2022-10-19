import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.userService.findOne(id)
  }

  @Get()
  getAll(){
    return this.userService.listAll()
  }
}
