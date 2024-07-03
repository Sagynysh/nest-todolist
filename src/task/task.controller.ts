import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly task_service: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.task_service.create(createTaskDto);
  }

  @Get('active')
  async active(){
    console.log('active');
    return this.task_service.active();
  }

  @Get()
  findAll() {
    return this.task_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('get by one');
    return this.task_service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.task_service.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.task_service.remove(+id);
  }

  @Get('complete/:id')
  async complete(@Param('id') id: string){
    return this.task_service.complete(+id);
  }
}
