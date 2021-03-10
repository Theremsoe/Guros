import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidationValidator {
    constructor (protected ctx: HttpContextContract) {
    }
    public schema = schema.create({
        dna: schema.array([rules.minLength(6), rules.maxLength(6)]).members(
            schema.string({ trim: true }, [
                rules.regex(/^([ATCG]{6,6})$/),
            ])
        ),
    })

    public messages = {}
}
