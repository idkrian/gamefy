import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserGTO } from './user.gto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

        async create(data: UserGTO){
            return this.prisma.user.create({data})
        }

        async getAll(){
            return this.prisma.user.findMany()
        }

        async getOne(id: number){
            return this.prisma.user.findFirst({where:{id}})
        }

        async update(data: UserGTO, id: number){
            return this.prisma.user.update({
                data,
                where:{
                    id
                }
            })
        }

        async delete(id: number){
            return this.prisma.user.delete({where:{id}})
        }
    
}
