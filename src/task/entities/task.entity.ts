import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    purpose : string;

    @Column()
    completed : boolean = false;

    @CreateDateColumn()
    create_datetime : Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    project : Project;

}
