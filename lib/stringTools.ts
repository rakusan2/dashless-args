export function linguisticJoin(arr: string[], lastJoiner = ' or', midJoiner = ',') {
    const len = arr.length
    if (len === 0) return ''
    let res = arr[0]
    if (len === 1) return res
    for (let i = 1; i < len - 1; i++) {
        const el = arr[i]
        res += midJoiner + ' ' + el
    }
    return res += lastJoiner + ' ' + arr[len - 1]
}

export function isStringArray(val: any): val is string[] {
    if (!Array.isArray(val)) return false
    for (let i = 0; i < val.length; i++) {
        if (typeof val[i] !== 'string') return false
    }
    return true
}