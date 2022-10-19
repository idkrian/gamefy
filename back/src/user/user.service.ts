import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto, 
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    await this.prisma.user.create({data})

    return {
      ...createUserDto,
      password: undefined
    }
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({where:{
      email
    }})
    return `This action returns a #${email} user`;
  }

  listAll(){
    return this.prisma.user.findMany()
  }

}
