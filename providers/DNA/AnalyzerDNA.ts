import { NucleoBaseCounter } from './NucleoBaseCounter'

export class AnalyzerDNA {
    constructor(
        public readonly matrix: Array<string[]>,
    ) {
        if (!AnalyzerDNA.isQuadratic(this.matrix)) {
            throw new Error('The given matrix is not quadratic.')
        }
    }

    public static isQuadratic(matrix: Array<unknown[]>): boolean {
        const dimension: number = matrix.length

        return dimension > 0 && matrix.every((bits: unknown[]): boolean => bits.length === dimension)
    }

    public static fromString(input: string, size: number = 6): AnalyzerDNA {
        const pattern: RegExp = new RegExp(`.{1,${size}}`, 'g')

        return AnalyzerDNA.from(
            input.match(pattern) ?? []
        )
    }

    public static from(input: string[]): AnalyzerDNA {
        return new AnalyzerDNA(
            input.map((bit: string): string[] => [...bit])
        )
    }

    public analize(): boolean {
        return this.rawCheckout() || this.diagonalCheckout()
    }

    public rawCheckout(): boolean {
        const dimension: number = this.matrix.length

        for (let x: number = 0; x < dimension; x++) {
            const counterX: NucleoBaseCounter = new NucleoBaseCounter()
            const counterY: NucleoBaseCounter = new NucleoBaseCounter()

            for (let y: number = 0; y < dimension; y++) {
                if (
                    counterX.checkout(this.matrix[x][y]).hasMutation() ||
                    counterY.checkout(this.matrix[y][x]).hasMutation()
                ) {
                    return true
                }
            }
        }

        return false
    }

    public diagonalCheckout(): boolean {
        const dimension: number = this.matrix.length

        for (let iterations: number = 0; iterations < dimension * 2; iterations++) {
            const diag: NucleoBaseCounter = new NucleoBaseCounter()
            const diagInver: NucleoBaseCounter = new NucleoBaseCounter()

            for (let y: number = 0; y < dimension; y++) {
                const x: number = iterations - y
                const inverseX: number = (dimension - x) - 1
                if (x >= 0 && x < dimension) {
                    if (
                        diag.checkout(this.matrix[x][y]).hasMutation() ||
                        diagInver.checkout(this.matrix[inverseX][y]).hasMutation()
                    ) {
                        return true
                    }
                }
            }
        }

        return false
    }
}
