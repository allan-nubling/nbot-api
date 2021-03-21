import { NextFunction, Request, Response, Router } from 'express'

import ExampleController from '@controllers/ExampleController'
import { NotFound } from '@utils/errors'

const { NODE_ENV } = process.env
const routes = Router()

routes.get('/', async (_req: Request, res: Response) => {
    res.send('⚡️[server]: Server is running')
})

routes.all('/webhook', async (req: Request, res: Response) => {
    console.log(req.method)
    console.log('body', req.body)
    console.log('query', req.query)
    console.log(NODE_ENV)
    res.send(NODE_ENV)
})

routes.get('/env', async (req: Request, res: Response) => {
    res.send(NODE_ENV)
})

routes.post('/example', ExampleController.save)

routes.all('*', async (_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFound('route not found'))
})

export default routes
