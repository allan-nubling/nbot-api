import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

import Order from './Order'
import Trial from './Trial'
import User from './User'

@Entity({ name: 'characters' })
export default class Character extends BaseEntity {
    @PrimaryColumn()
    mnk: string

    @Column()
    userId: number

    @Column()
    name: string

    @Column()
    expirationDate: Date

    @Column()
    hash: string

    @ManyToOne(_type => User, user => user.characters)
    user: User

    @OneToMany(_type => Order, order => order.character)
    orders: Order[]

    @OneToOne(_type => Trial, trial => trial.character)
    trial: Trial

    constructor(params: { mnk: string; name: string }) {
        super()
        this.mnk = params?.mnk
        this.name = params?.name
    }
}
