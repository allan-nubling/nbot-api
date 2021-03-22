import { NextFunction, Request, Response, Router } from 'express'

import ExampleController from '@controllers/Example.controllers'
import { NotFound } from '@utils/errors'

import paymentRoute from './payment.routes'

const { NODE_ENV } = process.env
const routes = Router()

routes.use('/payment', paymentRoute)

routes.get('/', async (_req: Request, res: Response) => {
    res.send('⚡️[server]: Server is running')
})

routes.post('/webhook', async (req: Request, res: Response) => {
    console.log('body', req.body)
    res.send()
})

routes.get('/env', async (req: Request, res: Response) => {
    res.send(NODE_ENV)
})

routes.post('/example', ExampleController.save)

routes.all('*', async (_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFound('route not found'))
})

export default routes
