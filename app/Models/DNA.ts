import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, afterCreate } from '@ioc:Adonis/Lucid/Orm'
import { AnalyzerDNA } from 'Providers/DNA/AnalyzerDNA'
import Event from '@ioc:Adonis/Core/Event'

export default class DNA extends BaseModel {
    public static readonly table: string = 'DNA'

    @column({ isPrimary: true })
    public id: number

    @column()
    public dna: string

    @column({ columnName: 'has_mutation' })
    public hasMutation: boolean

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeCreate()
    public static async analyze(dna: DNA): Promise<void> {
        dna.hasMutation = AnalyzerDNA.fromString(dna.dna).analize()
    }

    @afterCreate()
    public static async syncStats(dna: DNA): Promise<void> {
        Event.emit('dna:created', dna)
    }
}
