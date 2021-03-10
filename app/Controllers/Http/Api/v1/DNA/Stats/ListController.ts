import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stats from 'App/Models/Stats'

export default class ListController {
    public async index({ response }: HttpContextContract): Promise<void> {
        const mutation: Stats = await Stats.firstOrCreate(
            { key: 'count_mutations' },
            { key: 'count_mutations', value: 0 },
        )
        const noMutation: Stats = await Stats.firstOrCreate(
            { key: 'count_no_mutations' },
            { key: 'count_no_mutations', value: 0 },
        )
        return response.json({
            count_mutations: mutation.value,
            count_no_mutation: noMutation.value,
            ratio: (mutation.value / (noMutation.value || 1)).toFixed(2),
        })
    }
}
