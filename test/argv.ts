import { getParams } from '..';

console.log(getParams([
    {
        name: 'par',
        shortName:'p',
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
]))