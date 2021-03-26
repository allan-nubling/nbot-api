import { NextFunction, Request, Response } from 'express'

import { GeneralError } from '@utils/errors'

const { NODE_ENV } = process.env

export default function handleErrors(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof GeneralError) {
        res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        })
    } else if (NODE_ENV === 'production') {
        // eslint-disable-next-line no-console
        console.error(`[${new Date().toISOString()}]: ${err.message}`)
        res.status(500).json({
            status: 'error',
            message: '[server]: Error 500'
        })
    } else {
        // eslint-disable-next-line no-console
        console.error(`[Error]: ${err.message}`)
        res.status(500).json(err)
    }
}
