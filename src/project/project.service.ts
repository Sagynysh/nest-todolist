import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ProjectNotFoundException, UserNotFoundException } from 'src/exception/exceptions';
import { Task } from 'src/task/entities/task.entity';
import { CreateProjectTaskDto } from 'src/task/dto/create-project-task.dto';
import { log } from 'console';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private project_repository: Repository<Project>,
    @InjectRepository(User)
    private user_repository: Repository<User>,
    @InjectRepository(Task)
    private task_repository: Repository<Task>,
    private readonly data_source: DataSource
  ){}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.project_repository.save(createProjectDto); 
  }

  async findAll(login: string): Promise<Project[]> {
    const user_data = await this.user_repository.findOne({
      where: {
        login: login
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

  async findOne(login: string, id: number): Promise<Project> {
    const project_data =  await this.project_repository.findOne({
      where: {
        id: id,
        users:{
          login: login
        }
      }
    })

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

  async add_users(login:string, id: number, createUserDtos: CreateUserDto[]){
    const project_data = await this.project_repository.findOne({
      where:{
        id,
        users:{
          login: login
        }
      },
      relations:{
        users: true
      }
      });

    if (!project_data) {
      throw new ProjectNotFoundException();
    }
    
    project_data.users = [...project_data.users];

    for(const user of createUserDtos){
      // eslint-disable-next-line no-var
      var user_data = await this.user_repository.findOneBy({
        login: user.login
      });
      
      if(user_data){
        project_data.users.push(user_data);
      }
    }
    return this.project_repository.save(project_data);
  }


  async create_project_and_task(login: string, createProjectTaskDto: CreateProjectTaskDto): Promise<Project>{
    const query_runner = this.data_source.createQueryRunner();
    await query_runner.connect();
    await query_runner.startTransaction();
    try{
      const user_data = await query_runner.manager.findOneBy(User,{login});
      console.log('create project-task user_data',user_data);
      if(!user_data){
        throw new UserNotFoundException();
      }
      
      const project_data = new Project();
      project_data.project_name = createProjectTaskDto.project_name;
      console.log('create project-task project_data',project_data);
      project_data.users = [];
      project_data.users.push(user_data);
      await query_runner.manager.save(project_data);

      const task_data = new Task();
      task_data.purpose = createProjectTaskDto.purpose;
      task_data.project = project_data;
      await query_runner.manager.save(task_data);

      await query_runner.commitTransaction();
      return project_data
    }catch(error){
      await query_runner.rollbackTransaction();
      throw error;
    }finally{
      await query_runner.release();
    }
    return null;


  }
}
