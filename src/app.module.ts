import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [UserModule, ProjectModule, TaskModule,
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : '0.0.0.0',
      port : 5432,
      password : 'mypassword',
      username : 'myuser',
      entities : [User, Project, Task],
      database : 'mydatabase',
      synchronize : true,
      logging : true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
