import { BadRequest, NotFound, Unauthorized } from '@utils/errors'
import { NextFunction, Request, Response } from 'express'

class ExampleController {
    async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error }: Record<string, number> = req.body
            if (error === 400) throw new BadRequest('Bad error request')
            else if (error === 401) throw new Unauthorized('Unauthorized error')
            else if (error === 404) throw new NotFound('Error not found')
            else throw new Error('Error')
        } catch (err) {
            next(err)
        }
    }
}

export default new ExampleController()
