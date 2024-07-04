import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({description: 'name of user', nullable: false})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({description: 'unique login of user', nullable: false})
    @IsNotEmpty()
    @IsString()
    login: string;
}
