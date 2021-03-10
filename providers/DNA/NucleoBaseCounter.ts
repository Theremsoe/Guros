export class NucleoBaseCounter {
    protected base: string = ''
    protected counter: number = 1
    public readonly mutationLimit: number = 4

    public checkout(base: string): NucleoBaseCounter {
        if (this.base !== base) {
            this.base = base
            this.counter = 1
        } else {
            this.counter++
        }

        return this
    }

    public hasMutation(): boolean {
        return this.counter >= this.mutationLimit
    }
}
