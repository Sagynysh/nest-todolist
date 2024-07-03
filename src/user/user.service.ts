import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private user_repository : Repository<User>,

    @InjectRepository(Project)
    private project_repository : Repository<Project>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user_data = await this.user_repository.save(createUserDto);
    return user_data;
  }

  async findAll(): Promise<User[]>{
    return this.user_repository.find();
  }

  async findOne(id: number): Promise<User>{
    const user_data = await this.user_repository.findOneBy({id});
    if(!user_data){
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return user_data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    const existingUser = await this.user_repository.findOneBy({id});
    const user_data = await this.user_repository.merge(existingUser, updateUserDto);
    return await this.user_repository.save(user_data);
  }

  async remove(id: number): Promise<User>{
    const existingUser = await this.user_repository.findOneBy({id});
    return await this.user_repository.remove(existingUser);
  }

  async projects(id: number): Promise<Project[]>{
    const user_data = await this.user_repository.findOne({
      where:{
        id: id
      },
      relations: {
        project: true
      }
    });

    return user_data.project;
  }
}
