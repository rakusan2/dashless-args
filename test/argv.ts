import { getParams } from '..';

console.log(getParams([
    {
        name: 'par',
        shortName:'p',
        type: 'number'
    },
    {
        groupName: 'g',
        description:'Just some text. Just some more text. Just some more text. Just some more text. Just some more text. Just some more text. Just some more text. Just some more text. Just some more text.',
        parameters: [
            {
                name: 'par2',
                type: 'string'
            }
        ]
    },
    {
        groupName: 'b',
        parameters:[
            {
                name: 'par3',
                shortName:'p3',
                alias: ['1par3', '2par3', '3par3'],
                description: 'Just another argument.',
                switchValue: 5,
                type:['string', 'boolean', 'number']
            }
        ]
    },
    {
        name: 'rest',
        type: 'string',
        catchAll: true
    }, 'str'
]))