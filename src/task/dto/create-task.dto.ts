import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

    @ApiProperty({description: 'the purpose of the task', nullable: false})
    @IsNotEmpty()
    @IsString()
    purpose: string;

    @ApiProperty({description: 'id of Project entity', nullable: true})
    @IsNumber()
    project_id: number;
}
