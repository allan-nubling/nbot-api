import { createConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DEBUG, NODE_ENV } = process.env

export default createConnection({
    type: 'mysql',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USER,
    password: DB_PASSWORD,
    database: NODE_ENV === 'development' ? 'tests' : 'nbot',
    entities: [`${__dirname}/entity/*`],
    synchronize: false,
    logging: NODE_ENV === 'development' && JSON.parse(DB_DEBUG),
    namingStrategy: new SnakeNamingStrategy()
}).catch(err => console.log(err.message))
