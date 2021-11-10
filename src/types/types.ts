// is not a .d.ts due to typescript not placing the output in the correct structure

export interface ParamReaderConfig {
    /** Will be used instead of `process.argv` */
    source?: string[]
    /** Will be used if `source` or `process.argv` is empty */
    defaultSource?: string[]
    /** Make parameters case sensitive */
    caseSensitive?: boolean
    /** disable dashless mode */
    disableDashlessMode?: boolean
    /** Disable Dashed Mode */
    disableDashedMode?: boolean
    /** Disable the `help` option */
    disableHelp?: boolean
    /** 
     * Continue after printing `help` info
     * 
     * By default `process.exit(0)` is called after printing `help` info
    */
    continueAfterHelp?: boolean
    /**
     * Command Name
     * 
     * Used only in `help`
     */
    commandName?:string
}

export type ParamTypes = 'string' | 'number' | 'boolean'

export interface ParamConfig<T = any> {
    /** 
     * Parameter name
     * 
     * Ex: `--port` when `name: 'port'`
     */
    name: string
    /**
     * Parameter Description used in `--help`
     */
    description?: string
    /**
     * Different Parameter Name
     */
    alias?: string | string[]
    /**
     * Short Name of parameter
     * 
     * Ex: `-p` when `shortName: 'p'`
     */
    shortName?: string
    /** Property name in returned object */
    propertyName?: string
    /** 
     * Parameter type
     * 
     * Required if `switchValue` is undefined
     */
    type?: ParamTypes | ParamTypes[] | ((val: string) => any)
    /** Replaces value after being converted */
    replace?: (val: any) => T
    /** Validates string before being converted */
    validateRaw?: RegExp | ((val: string) => boolean | string | undefined)
    /** Validates value after being converted */
    validate?: (val: T) => boolean | string | undefined
    /** Invalid values are logged instead of thrown */
    softValidate?: boolean
    /** Property or properties under which to put results */
    group?: string | string[]
    /**
     * Value to set if parameter is not assigned a value
     * 
     * Required if `type` is undefined
     */
    switchValue?: any
    /** 
     * Property can be assigned multiple values
     * 
     * Ex: `{name: 'id', type: 'string', multiple: true}` with args `--id aa --id bb` with return `{id: ['aa', 'bb']}`
     */
    multiple?: boolean
    /**
     * Any values not with property not being specified will be put into this property after all properties specified are assigned a value
     * 
     * Setting this to true will also set `multiple` to true
     */
    catchAll?: boolean
    /** 
     * The value to be set if not set by any arguments
    */
    default?: T
    /**
     * Allow defaults to create group object
     */
    defaultCreateGroup?: boolean
}

export interface ParamGroupConfig {
    /**
     * Group Name
     */
    groupName: string
    /**
     * Group Description used in `--help`
     */
    description?: string
    /**
     * Property name of the group in the returned object
     */
    propertyName?: string
    /**
     * Child Parameter configs of the group
     * 
     * All parameters will have their name prefixed with the group name
     * 
     * Ex: `groupName: 'udp'` and `name: 'port'` will result in `name: 'udp-port'`
     */
    parameters?: (ParamConfig | string)[]
    /**
     * Function that replaces the value of the returned group object
     * 
     * Runs after all arguments have been read and defaults set
     */
    finalize?: (val: any) => any
}