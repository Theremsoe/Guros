import test from 'japa'
import { Assert } from 'japa/build/src/Assert'
import { AnalyzerDNA } from 'Providers/DNA/AnalyzerDNA'

test.group('DNA class', (): void => {
    test('Check that "isQuadratic" returns true with quadratic matrix', (assert: Assert): void => {
        const matrix: Array<string[]> = [
            ['1', '2', '3', '4'],
            ['3', '2', '3', '7'],
            ['1', '9', '6', '5'],
            ['6', '2', '3', '3'],
        ]

        assert.isTrue(AnalyzerDNA.isQuadratic(matrix))
    })

    test('Check that "isQuadratic" returns false with not quadratic matrix', (assert: Assert): void => {
        const matrix: Array<string[]> = [
            ['1', '2', '3', '4'],
            ['3', '2', '3', '7'],
        ]

        assert.isFalse(AnalyzerDNA.isQuadratic(matrix))
    })

    test('Check that DNA fromString methods create a new instance from a string', (assert: Assert): void => {
        const dna: AnalyzerDNA = AnalyzerDNA.fromString('ATGCGACAGTGCTTATGTAGAAGGCCCCTATCACTG')
        assert.deepEqual(dna.matrix, [
            ['A', 'T', 'G', 'C', 'G', 'A'],
            ['C', 'A', 'G', 'T', 'G', 'C'],
            ['T', 'T', 'A', 'T', 'G', 'T'],
            ['A', 'G', 'A', 'A', 'G', 'G'],
            ['C', 'C', 'C', 'C', 'T', 'A'],
            ['T', 'C', 'A', 'C', 'T', 'G'],
        ])
    })

    test('check that from method create a new instance from a array of string', (assert: Assert): void => {
        const dna: AnalyzerDNA = AnalyzerDNA.from(['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'])
        assert.deepEqual(dna.matrix, [
            ['A', 'T', 'G', 'C', 'G', 'A'],
            ['C', 'A', 'G', 'T', 'G', 'C'],
            ['T', 'T', 'A', 'T', 'G', 'T'],
            ['A', 'G', 'A', 'A', 'G', 'G'],
            ['C', 'C', 'C', 'C', 'T', 'A'],
            ['T', 'C', 'A', 'C', 'T', 'G'],
        ])
    })

    test(
        'Check that DNA constructor raise a exception when a given matrix is not quadratic',
        (assert: Assert): void => {
            assert.throws(
                () => AnalyzerDNA.fromString('Invalid quadratic string'),
                'The given matrix is not quadratic.'
            )
        }
    )

    test('Check that DNA not detect mutations with a clear matrix', (assert: Assert): void => {
        assert.isFalse(
            AnalyzerDNA.from(['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG']).analize()
        )
    })
    test('Check that DNA detect mutations with a wrong matrix', (assert: Assert): void => {
        assert.isTrue(
            AnalyzerDNA.from(['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']).analize()
        )
    })

    test('Check that DNA detect raw mutations.', (assert: Assert): void => {
        assert.isTrue(
            (new AnalyzerDNA(
                [
                    ['A', 'T', 'G', 'C', 'G', 'A'],
                    ['C', 'A', 'G', 'T', 'G', 'C'],
                    ['T', 'T', 'A', 'T', 'G', 'T'],
                    ['A', 'G', 'A', 'A', 'G', 'G'],
                    ['C', 'C', 'C', 'C', 'T', 'A'],
                    ['T', 'C', 'A', 'C', 'T', 'G'],
                ]
            )).rawCheckout()
        )
        assert.isFalse(
            (new AnalyzerDNA(
                [
                    ['A', 'T', 'G', 'C', 'G', 'A'],
                    ['C', 'A', 'G', 'T', 'G', 'C'],
                    ['T', 'T', 'A', 'T', 'C', 'T'],
                    ['A', 'G', 'A', 'A', 'G', 'G'],
                    ['C', 'C', 'A', 'C', 'T', 'A'],
                    ['T', 'C', 'G', 'C', 'T', 'G'],
                ]
            )).rawCheckout()
        )
    })

    test('Check that DNA detect diagonal mutations.', (assert: Assert): void => {
        assert.isTrue(
            (new AnalyzerDNA(
                [
                    ['A', 'T', 'G', 'C', 'G', 'A'],
                    ['C', 'A', 'G', 'T', 'G', 'C'],
                    ['T', 'T', 'A', 'T', 'G', 'T'],
                    ['A', 'G', 'A', 'A', 'G', 'G'],
                    ['C', 'C', 'C', 'C', 'T', 'A'],
                    ['T', 'C', 'A', 'C', 'T', 'G'],
                ]
            )).diagonalCheckout()
        )

        assert.isTrue(
            (new AnalyzerDNA(
                [
                    ['T', 'T', 'G', 'C', 'G', 'A'],
                    ['C', 'A', 'G', 'T', 'G', 'C'],
                    ['C', 'T', 'A', 'T', 'G', 'T'],
                    ['A', 'C', 'A', 'A', 'G', 'G'],
                    ['C', 'C', 'C', 'C', 'T', 'A'],
                    ['T', 'C', 'A', 'C', 'T', 'G'],
                ]
            )).diagonalCheckout()
        )

        assert.isFalse(
            (new AnalyzerDNA(
                [
                    ['A', 'T', 'G', 'C', 'G', 'A'],
                    ['C', 'A', 'G', 'T', 'G', 'C'],
                    ['T', 'T', 'G', 'T', 'G', 'T'],
                    ['A', 'G', 'A', 'A', 'G', 'G'],
                    ['C', 'C', 'C', 'C', 'T', 'A'],
                    ['T', 'C', 'A', 'C', 'T', 'G'],
                ]
            )).diagonalCheckout()
        )
    })
})
