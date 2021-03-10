import Event from '@ioc:Adonis/Core/Event'
import DNA from 'App/Models/DNA'
import Stats from 'App/Models/Stats'

Event.on('dna:created', async (dna: DNA): Promise<void> => {
    const key: string = dna.hasMutation ? 'count_mutations' : 'count_no_mutations'
    const stat: Stats = await Stats.firstOrCreate({ key }, { key, value: 0 })

    stat.value++
    stat.save()
})
