import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTaskDto {

    @ApiProperty({description: 'the purpose of the task', nullable: false})
    @IsNotEmpty()
    @IsString()
    purpose: string;

    @ApiProperty({description: 'Project name for this task', nullable: true})
    @IsString()
    project_name: string;
}
