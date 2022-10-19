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

  @Get(':email')
  findOne(@Param('email') email: string){
    return this.userService.findOne(email)
  }

  @Get()
  getAll(){
    return this.userService.listAll()
  }
}
