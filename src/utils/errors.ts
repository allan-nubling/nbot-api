/* eslint-disable no-use-before-define */
export class GeneralError extends Error {
    status = 'GeneralError'

    constructor(message: string) {
        super()
        this.message = message
    }

    getCode(): number {
        if (this instanceof BadRequest) return 400
        if (this instanceof Unauthorized) return 401
        if (this instanceof NotFound) return 404
        return 500
    }
}

export class BadRequest extends GeneralError {
    status = 'BadRequest'
}
export class Unauthorized extends GeneralError {
    status = 'Unauthorized'
}
export class NotFound extends GeneralError {
    status = 'NotFound'
}
