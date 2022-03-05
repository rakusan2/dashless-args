import assert from 'assert';
import { getParams } from '../src';
import { ParamReaderConfig } from '../src/types/types';
function parFunc(opt: ParamReaderConfig) {
    return getParams([
        {
            name: 'par',
            type: 'number'
        },
        {
            groupName: 'g',
            parameters: [
                {
                    name: 'par2',
                    type: 'string'
                }
            ]
        },
        {
            name: 'rest',
            type: 'string',
            catchAll: true
        }, 'str'
    ], opt)
}

assert.deepStrictEqual(parFunc({ source: ['par=5', 'g-par2=two'] }), { par: 5, g: { par2: 'two' } })
assert.deepStrictEqual(parFunc({ source: ['--par', '5', '--g-par2=two'] }), { par: 5, g: { par2: 'two' } })
assert.deepStrictEqual(parFunc({ source: ['5', 'two', 'three', 'four'] }), { par: 5, g: { par2: 'two' }, rest: ['three', 'four'] })
assert.deepStrictEqual(parFunc({ source: ['str=one'] }), { str: 'one' })
assert.deepStrictEqual(parFunc({ source: ['str=one:1'] }), { str: 'one:1' })
assert.deepStrictEqual(parFunc({ source: ['pogo=extra'], extraParams: true }), { _extra: [{ key: 'pogo', val: 'extra' }] })