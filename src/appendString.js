export function appendStringSimple(strToAppend) {
    return function (target) {
        const { set } = target
        return {
            ...target,
            set(value) {
                return set.call(this, `${value}${strToAppend}`)
            },
            init(initialValue) {
                return `${initialValue}${strToAppend}`
            },
        }
    }
}

export function appendStringComplex(strToAppend) {
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
