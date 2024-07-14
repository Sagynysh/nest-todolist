import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { UserNotFoundException } from 'src/exception/exceptions';

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

  async findByLogin(login: string): Promise<User>{
    const user_data = await this.user_repository.findOneBy({login});
    if(!user_data){
      throw new UserNotFoundException();
    }
    return user_data;
  }

  async findOne(id: number): Promise<User>{
    const user_data = await this.user_repository.findOneBy({id});
    if(!user_data){
      throw new UserNotFoundException();
    }
    return user_data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    const existing_user = await this.user_repository.findOneBy({id});
    if(!existing_user){
      throw new UserNotFoundException();
    }
    const user_data = this.user_repository.merge(existing_user, updateUserDto);
    return await this.user_repository.save(user_data);
  }

  async remove(id: number): Promise<User>{
    const existing_user = await this.user_repository.findOneBy({id});
    if(!existing_user){
      throw new UserNotFoundException();
    }
    return await this.user_repository.remove(existing_user);
  }

  async projects(id: number): Promise<Project[]>{
    const user_data = await this.user_repository.findOne({
      where:{
        id: id
      },
      relations: {
        projects: true
      }
    });

    if(!user_data){
      throw new UserNotFoundException();
    }

    return user_data.projects;
  }
}
