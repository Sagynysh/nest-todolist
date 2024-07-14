import { Body, Controller, Param, Post, Headers } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ProjectService } from 'src/project/project.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('project/:project_id/user')
export class ProjectUserController {

    constructor(
        private readonly project_service: ProjectService
    ) {}

    @ApiCreatedResponse({
        description: 'User added to Project Succesfully',
    })
    @Post()
    add_users(@Headers() headers: string, @Param('id') id: string, @Body() createUserDtos: CreateUserDto[]) {
        const login = headers['authorization'];
        return this.project_service.add_users(login, +id, createUserDtos);
    }
}
