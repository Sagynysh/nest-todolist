import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateProjectDto } from "src/project/dto/create-project.dto";

export class CreateTaskDto {

    @ApiProperty({description: 'the purpose of the task', nullable: false})
    @IsNotEmpty()
    @IsString()
    purpose: string;

    @ApiProperty({description: 'id of Project entity', nullable: false})
    @IsNotEmpty()
    @IsNumber()
    project_id: number;
}
