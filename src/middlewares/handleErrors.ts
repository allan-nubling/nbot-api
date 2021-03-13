import { GeneralError } from '@utils/errors'
import { NextFunction, Request, Response } from 'express'
const { NODE_ENV } = process.env

export default function handleErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        })
    } else if (NODE_ENV === 'production') {
        console.error(`[${new Date().toISOString()}]: ${err.message}`)
        return res.status(500).json({
            status: 'error',
            message: '[server]: Error 500'
        })
    } else {
        return res.status(500).json(err)
    }
}
