import assert from 'assert';
import { getParams } from '..';
import { ParamReaderConfig } from '../types';
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