# js-decorator-ordering-tests

These tests are here to provide a minimum reproducible repo for the ordering of decorators when applied sequentially to an initialized accessor:

```js
// appendString.js
function appendStringSimple(strToAppend) {
    return function (target) {
        const { set } = target
        return {
            ...target,
            set(value) {
                return set.call(this, `${value}${strToAppend}`);
            },
            init(initialValue) {
                return `${initialValue}${strToAppend}`
            },
        }
    }
}

// index.js
class FakeClassSimple {
    // Ordering is implemented innermost to outermost, hence "Baz" is first
    @appendStringSimple('Baz')
    @appendStringSimple('Bar')
    accessor fakeField = 'foo'
}
const simpleInstance = new FakeClassSimple()

console.log(simpleInstance.fakeField) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'

simpleInstance.fakeField = 'foo'
console.log(simpleInstance.fakeField) // FAILURE [X] expected: 'fooBarBaz' | actual: 'fooBazBar'
```

What is problematic is the behavior of the setters. To maintain the same order as initializers, the setters on the decorator must walk the entire parent chain back to the `root` setter, all the while splicing a string into position `1` in order to maintain the expected order.

```js
// appendString.js
function appendStringComplex(strToAppend) {
    return function (target) {
        const { set } = target
        return {
            ...target,
            set(value) {
                const appends = Array.isArray(value) ? value : [value]
                // You must splice the strToAppend into the array AFTER the first element
                // This is because the additional setters can only be called up the chain
                appends.splice(1, 0, strToAppend)
                // The only way to know if you are at the root `setter` is to check if `set` returns `undefined`
                // Making the set call with `appends` first results in fewer total calls to `set`
                if (set.call(this, appends) === undefined) {
                    // If you are at the root `setter` then you need an additional `set` call providing the new value
                    const newValue = appends.join('')
                    set.call(this, newValue)
                    return newValue
                }
            },
            init(initialValue) {
                return `${initialValue}${strToAppend}`
            },
        }
    }
}

// index.js
class FakeClassComplex {
    // Ordering is implemented innermost to outermost, hence "Baz" is first
    @appendStringComplex('Baz')
    @appendStringComplex('Bar')
    accessor fakeField = 'foo'
}
const complexInstance = new FakeClassComplex()

console.log(complexInstance.fakeField) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'

complexInstance.fakeField = 'foo'
console.log(complexInstance.fakeField) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'
```

The issue is not that the problem cannot be solved, it is that the solution runs counter-intuitive to the definition of the spec. The spec says plainly [here](https://github.com/tc39/proposal-decorators#1-evaluating-decorators)
> Decorators are evaluated as expressions, being ordered along with computed property names. This goes _left to right, top to bottom_.

This implies that decorators should not be executed "innermost decorator to outermost", but rather "outermost decorator to innermost". If the initializers were re-ordered to execute "outermost decorator to innermost", then the `appendStringSimple` function would work as expected.
