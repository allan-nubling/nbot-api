import { Request, Response } from 'express'
import { HandleErrors } from 'types/Controllers.types'

import { BadRequest, NotFound, Unauthorized } from '@utils/errors'

export default class ExampleController {
    @HandleErrors()
    static async save(req: Request, _res: Response): Promise<void> {
        const { error } = req.query as Record<string, string>
        if (error === '400') throw new BadRequest('Bad error request')
        else if (error === '401') throw new Unauthorized('Unauthorized error')
        else if (error === '404') throw new NotFound('Error not found')
        else throw new Error('Error')
    }
}
