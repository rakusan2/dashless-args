# Dashless Arguments
I didn't like escaping arguments in a command so I made this parser

This feature can be disabled

## Usage
```js
import { getParams } from 'dl-arguments'
let options = {
    caseSensitive: true // By default it is case-insensitive
};
const params = getParams([
    {
        name: 'par',
        type: 'number',
        switchValue: 1
    },
    {
        groupName: 'foo',
        parameters: [
            {
                name: 'bar',
                type: ['boolean', 'string']
            }
        ]
    }
], options);
```

- `par false`
    ```js
    params == {
        par: 1,
        for: {
            bar: false
        }
    }
    ```
- `2 foo-bar=lol`
    ```js
    params == {
        par: 2,
        foo: {
            bar: 'lol'
        }
    }
    ```
**Warning** unless `options.disableDashedMode = true` it does support dashes and will disable dashless mode if any argument starts with a dash
- `--par 3 foo-bar=lol`
    ```js
    params == {
        par: 3,
        foo: {
            bar: 'foo-bar=lol'        }
    }
    ```


## Source
By default it uses `process.argv`

Optionally it can use `options.source`

## Param Definition
A param definition can be as simple as a `string` upon which it will be replaced with `{ name: <value>, type: 'string' }`
- **name**
    - The name of argument
    - **Required**
- **alias**
    - Different name or names for the argument
    - accepts string or a string array
- **shortName**
    - in dashless mode, same as alias
    - in dashed mode, can be used with a single dash
    - Ex: if two switch parameters have a shortName `a` and `b`, they can be both set with `-ab`
- **propertyName**
    - If set, this will be used as the output object property name instead of `name`
- **switchValue**
    - Value to be set if none is passed to the parameter
    - **Required** if `type` is not set
- **type**
    - Type conversion for the parameter
    - Valid are `string`, `number`, `boolean`, an array of the previous, or a function that takes a string and outputs a value
    - If given an array, `string` will be taken last
    - **Required** if `switchValue` is not set
- **replace**
    - After the value has been converted, it is passed through this function to change it further
    - This can be useful when needing to load a file referenced by the argument
- **validateRaw**
    - Before a value is converted it can be checked if it is valid
    - Accepts RegExp or a function that takes a string
    - The value will be valid if it passes the RegExp or the function returns undefined or true
    - A passed function can return a string as the reason for the value being invalid
- **validate**
    - Runs after `replace`
    - Accepts a function that takes a value
    - The value will be valid if it the function returns undefined or true
    - A passed function can return a string as the reason for the value being invalid
- **softValidate**
    - If true, `validate` and `validateRaw` will `console.warn` instead of `throw`
- **group**
    - To which object should this argument be assigned
    - Accepts `string` or an Array of `string`
- **multiple**
    - Enables multiple values to be set to an argument
    - If set the result will be an array
    - Ex: if `name: 'par'` it can be used is `par=1 par=2 par=3`
- **catchAll**
    - Consumes extra values
    - if true sets `multiple: true`
- **default**
    - Value that is set if not set via an argument
- **defaultCreateGroup**
    - Allows defaults to create groups

## Param Group Definition
- **groupName**
    - The name of the group
- **propertyName**
    - Property name of the group in the returned object
- **parameters**
    - Argument definitions
    - All arguments will have their name prefixed with the group name
- **finalize**
    - function that runs after all arguments have been read if the group has been set
    - The returned value will be set replace the value of the group

## Options
- **source**
    - Will be used instead of `process.argv`
- **defaultSource**
    - Will be used if the current source has zero values
- **caseSensitive**
    - Will make argument names and boolean conversion case sensitive
- **disableDashlessMode**
    - Requires dashes when specifying a argument
- **disableDashedMode**
    - Stop parsing dashes
- **disableHelp**
    - The argument `help` will be treated like any other argument
- **continueAfterHelp**
    - Don't call `process.exit(0)` after printing help info
    - Parameter `help: true` will be added to the returned object if help was called
- **commandName**
    - Changes the name of command name in usage section of `help`

## Disabling help
1. Setting `options.disableHelp: true`
2. Setting `help` to any name or alias in argument config