import { NextFunction, Request, Response, Router } from 'express'

import ExampleController from '@controllers/Example.controllers'
import { NotFound } from '@utils/errors'

import appRoute from './app.routes'
import paymentRoute from './payment.routes'

const routes = Router()

routes.use('/payment', paymentRoute)

routes.use('/app', appRoute)

routes.get('/', async (_req: Request, res: Response) => {
    res.send('⚡️[server]: Server is running')
})

routes.post('/example', ExampleController.save)

routes.all('*', async (_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFound('route not found'))
})

export default routes
