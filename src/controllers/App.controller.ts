import { Request, Response } from 'express'
import { EntityNotFoundError, getRepository } from 'typeorm'
import { HandleErrors } from 'types/Controllers.types'

import Character from '@models/Character'
import { BadRequest, Unauthorized } from '@utils/errors'

export default class AppController {
    @HandleErrors()
    static async auth(req: Request, res: Response): Promise<void> {
        const { mnk, name } = req.query as Record<string, string>

        if (!mnk.match(/\bMNK\d+[A-Z]{2}\d+\b/)) throw new BadRequest('invalid id')
        const character = await getRepository(Character)
            .findOneOrFail({ where: { mnk } })
            .catch(async err => {
                if (err instanceof EntityNotFoundError) {
                    const _character = new Character({ mnk, name })
                    await _character.save()
                    return _character
                }
                throw err
            })

        if (name && name.trim().length > 0 && name !== character.name) {
            character.name = name
            await character.save()
        }

        // TODO: Auth verification.
        // if (character.expirationDate && character.expirationDate.getTime() >= new Date().getTime()) {
        res.send('ok')
        // } else throw new Unauthorized('')
    }
}
