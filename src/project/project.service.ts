import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { throwError } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ProjectNotFoundException } from 'src/exception/exceptions';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private project_repository: Repository<Project>,

    @InjectRepository(User)
    private user_repository: Repository<User>,
  ){}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.project_repository.save(createProjectDto); 
  }

  async findAll(): Promise<Project[]> {
    return await this.project_repository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project_data = await this.project_repository.findOne({
      where: {
        id: id
      },
      relations: {
        tasks: true
      }
    });

    if(!project_data){
      throw new ProjectNotFoundException();
    }
    return project_data;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.project_repository.delete({id});
  }

  async add_users(id: number, createUserDtos: CreateUserDto[]){
    const project_data = await this.project_repository.findOne({
      where:{
        id
      },
      relations:{
        users: true
      }
      });

    if (!project_data) {
      throw new ProjectNotFoundException();
    }
    
    project_data.users = [...project_data.users];

    for(let user of createUserDtos){
      var user_data = await this.user_repository.findOneBy({
        login: user.login
      });
      
      if(user_data){
        project_data.users.push(user_data);
      }
    }
    return this.project_repository.save(project_data);
  }
}
