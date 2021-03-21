import { Router } from 'express'

import ExampleController from '@controllers/ExampleController'

const { NODE_ENV } = process.env
const routes = Router()

routes.get('/', async (_req, res) => {
    res.send('⚡️[server]: Server is running')
})

routes.get('/env', async (_req, res) => {
    res.send(NODE_ENV)
})

routes.post('/example', ExampleController.save)

routes.all('*', (_req, res) => {
    return res.status(404).json({
        status: 'error',
        message: 'route not found'
    })
})

export default routes
