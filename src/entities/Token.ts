import { Column, Entity, PrimaryGeneratedColumn,  OneToOne, JoinColumn} from "typeorm";
import { Login } from "./Login";
@Entity('token')
export class Token{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Login)
    @JoinColumn()
    login: Login

    @Column({type: 'text'})
    token: string

    @Column({type: "date"})
    createdAt: Date
}