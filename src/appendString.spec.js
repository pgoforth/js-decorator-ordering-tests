import { appendStringComplex, appendStringSimple } from './appendString'

describe('@appendString', () => {
    describe('  ⛛ appendStringSimple', () => {
        describe('- Executed innermost decorator to outermost decorator (right->left, bottom->top)', () => {
            it('should chain decorator initializars in the correct order', () => {
                class FakeClass {
                    @appendStringSimple('Baz')
                    @appendStringSimple('Bar')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                expect(instance.fakeField).toEqual('fooBarBaz')
            })

            it('should chain decorator setters in the correct order', () => {
                class FakeClass {
                    @appendStringSimple('Baz')
                    @appendStringSimple('Bar')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                instance.fakeField = 'foo'
                expect(instance.fakeField).toEqual('fooBarBaz')
            })
        })

        describe('- Executed outermost decorator to innermost decorator (left->right, top->bottom)', () => {
            it('should chain decorator initializars in the correct order', () => {
                class FakeClass {
                    @appendStringSimple('Bar')
                    @appendStringSimple('Baz')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                expect(instance.fakeField).toEqual('fooBarBaz')
            })

            it('should chain decorator setters in the correct order', () => {
                class FakeClass {
                    @appendStringSimple('Bar')
                    @appendStringSimple('Baz')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                instance.fakeField = 'foo'
                expect(instance.fakeField).toEqual('fooBarBaz')
            })
        })
    })

    describe('  ⛛ appendStringComplex', () => {
        describe('- Executed innermost decorator to outermost decorator (right->left, bottom->top)', () => {
            it('should chain decorator initializars in the correct order', () => {
                class FakeClass {
                    @appendStringComplex('Baz')
                    @appendStringComplex('Bar')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                expect(instance.fakeField).toEqual('fooBarBaz')
            })

            it('should chain decorator setters in the correct order', () => {
                class FakeClass {
                    @appendStringComplex('Baz')
                    @appendStringComplex('Bar')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                instance.fakeField = 'foo'
                expect(instance.fakeField).toEqual('fooBarBaz')
            })
        })
        describe('- Executed outermost decorator to innermost decorator (left->right, top->bottom)', () => {
            it('should chain decorator initializars in the correct order', () => {
                class FakeClass {
                    @appendStringComplex('Bar')
                    @appendStringComplex('Baz')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                expect(instance.fakeField).toEqual('fooBarBaz')
                instance.fakeField = 'foo'
                expect(instance.fakeField).toEqual('fooBarBaz')
            })

            it('should chain decorator setters in the correct order', () => {
                class FakeClass {
                    @appendStringComplex('Bar')
                    @appendStringComplex('Baz')
                    accessor fakeField = 'foo'
                }
                const instance = new FakeClass()
                expect(instance.fakeField).toEqual('fooBarBaz')
                instance.fakeField = 'foo'
                expect(instance.fakeField).toEqual('fooBarBaz')
            })
        })
    })
})
