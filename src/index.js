import { appendStringComplex, appendStringSimple } from './appendString'

class FakeClassSimple {
    // Ordering is implemented innermost to outermost, hence "Baz" is first
    @appendStringSimple('Baz')
    @appendStringSimple('Bar')
    accessor fakeField = 'foo'
}
const simpleInstance = new FakeClassSimple()
console.log('\n')
console.log('FakeClassSimple')
console.log(
    `  ${
        simpleInstance.fakeField === 'fooBarBaz' ? '✅ SUCCESS' : '❌ FAILURE'
    }   initializer -- expected: 'fooBarBaz' | actual: '${
        simpleInstance.fakeField
    }'`
) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'

simpleInstance.fakeField = 'foo'
console.log(
    `  ${
        simpleInstance.fakeField === 'fooBarBaz' ? '✅ SUCCESS' : '❌ FAILURE'
    }        setter -- expected: 'fooBarBaz' | actual: '${
        simpleInstance.fakeField
    }'`
) // FAILURE [X] expected: 'fooBarBaz' | actual: 'fooBazBar'

class FakeClassComplex {
    // Ordering is implemented innermost to outermost, hence "Baz" is first
    @appendStringComplex('Baz')
    @appendStringComplex('Bar')
    accessor fakeField = 'foo'
}
const complexInstance = new FakeClassComplex()
console.log('\n')
console.log('FakeClassComplex')
console.log(
    `  ${
        complexInstance.fakeField === 'fooBarBaz' ? '✅ SUCCESS' : '❌ FAILURE'
    }   initializer -- expected: 'fooBarBaz' | actual: '${
        complexInstance.fakeField
    }'`
) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'

complexInstance.fakeField = 'foo'
console.log(
    `  ${
        complexInstance.fakeField === 'fooBarBaz' ? '✅ SUCCESS' : '❌ FAILURE'
    }        setter -- expected: 'fooBarBaz' | actual: '${
        complexInstance.fakeField
    }'`
) // SUCCESS [✓] expected: 'fooBarBaz' | actual: 'fooBarBaz'
console.log('\n')
