import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateStatsTables extends BaseSchema {
    protected readonly tableName: string = 'STATS'

    public async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id')
            table.string('key').unique()
            table.decimal('value').defaultTo(0)
            table.timestamps(true)
        })
    }

    public async down(): Promise<void> {
        this.schema.dropTable(this.tableName)
    }
}
