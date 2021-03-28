import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import Character from './Character'

@Entity({ name: 'trials' })
export default class Trial {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mnk: string

    @Column()
    email: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @OneToOne(_type => Character)
    @JoinColumn({ name: 'mnk' })
    character: Character
}
