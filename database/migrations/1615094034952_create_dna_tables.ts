import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateDnaTables extends BaseSchema {
    protected readonly tableName: string = 'DNA'

    public async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table): void => {
            table.bigIncrements('id')
            table.text('dna')
            table.boolean('has_mutation').defaultTo(false)
            table.timestamps(true)
        })
    }

    public async down(): Promise<void> {
        this.schema.dropTable(this.tableName)
    }
}
