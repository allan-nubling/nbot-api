import { NextFunction, Request, Response } from 'express'

import { Unauthorized } from '@utils/errors'

export default function protectedRoute(req: Request, _res: Response, next: NextFunction): void {
    const { app_key: appKey } = req.headers as Record<string, string>
    if (appKey === 'test') next()
    else throw new Unauthorized('unauthorized')
}
