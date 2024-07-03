import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try{
      await this.user_service.create(createUserDto);

      return {
        success : true,
        message : 'User create successfully'
      }
    }catch(error){
      return {
        success : false,
        message : error.message
      }
    }
  }

  @Get(':id/projects')
  findProjects(@Param('id') id: string) {
    console.log('projects of user');
    return this.user_service.projects(+id);
  }

  @Get()
  findAll() {
    return this.user_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.user_service.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user_service.remove(+id);
  }
}
