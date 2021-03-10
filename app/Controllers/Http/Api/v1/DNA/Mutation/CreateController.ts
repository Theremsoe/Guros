import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DNA from 'App/Models/DNA'
import CreateValidationValidator from 'App/Validators/DNA/Mutation/CreateValidationValidator'
import MutationFoundException from 'App/Exceptions/MutationFoundException'

export default class CreateController {
    public async index({ request }: HttpContextContract): Promise<DNA> {
        const payload = await request.validate(CreateValidationValidator)
        const dna: DNA = await DNA.create({ dna: payload.dna.join('') })

        if (dna.hasMutation) {
            throw new MutationFoundException()
        }

        return dna
    }
}
