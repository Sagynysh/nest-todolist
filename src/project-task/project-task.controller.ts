import { Body, Controller, Post, Headers } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ProjectService } from 'src/project/project.service';
import { CreateProjectTaskDto } from 'src/task/dto/create-project-task.dto';

@Controller('project/task')
export class ProjectTaskController {
    constructor(
        private readonly project_service: ProjectService
    ) {}

    @ApiCreatedResponse({
        description: 'Project and task was created successfully',
    })
    @Post()
    create_project_and_task(@Headers() headers: string, @Body() createTaskDto: CreateProjectTaskDto) {
        const login = headers['authorization'];
        return this.project_service.create_project_and_task(login, createTaskDto);
    }
}
