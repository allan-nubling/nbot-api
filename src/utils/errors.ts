export class GeneralError extends Error {
    constructor(message: string) {
        super()
        this.message = message
    }

    getCode(): number {
        if (this instanceof BadRequest) return 400
        else if (this instanceof Unauthorized) return 401
        else if (this instanceof NotFound) return 404
        else return 500
    }
}

export class BadRequest extends GeneralError {}
export class Unauthorized extends GeneralError {}
export class NotFound extends GeneralError {}
