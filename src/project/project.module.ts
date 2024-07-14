import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { ProjectTaskController } from 'src/project-task/project-task.controller';
import { ProjectUserController } from 'src/project-user/project-user.controller';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Task])],
  controllers: [ProjectController, ProjectTaskController, ProjectUserController],
  providers: [ProjectService],
})
export class ProjectModule {}
