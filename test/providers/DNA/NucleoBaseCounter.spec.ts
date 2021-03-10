import test from 'japa'
import { NucleoBaseCounter } from 'Providers/DNA/NucleoBaseCounter'

test.group('Nucleo Base Counter', (): void => {
    test('Check that mutation is true when checkouts is grather or equal to mutation limit.', (assert): void => {
        const counter: NucleoBaseCounter = new NucleoBaseCounter()

        counter.checkout('A')
            .checkout('A')
            .checkout('A')
            .checkout('A')

        assert.isTrue(counter.hasMutation())
    })

    test('Check that mutation is false when checkouts are less than mutation limit', (assert): void => {
        const counter: NucleoBaseCounter = new NucleoBaseCounter()

        counter.checkout('A')
            .checkout('A')

        assert.isFalse(counter.hasMutation())
    })
})
