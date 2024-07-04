import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;

    @ApiProperty()
    @Column()
    purpose : string;

    @ApiProperty()
    @Column()
    completed : boolean = false;

    @ApiProperty()
    @CreateDateColumn()
    create_datetime : Date;

    @ApiProperty()
    @ManyToOne(() => Project, (project) => project.tasks)
    project : Project;

}
