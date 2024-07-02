import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    project_name : string;

    @ManyToMany(() => User)
    @JoinTable()
    users : User[];

    @OneToMany(() => Task, (task) => task.project,{
        cascade: true
    })
    tasks : Task[];
}
