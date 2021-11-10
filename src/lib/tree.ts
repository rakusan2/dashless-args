import { ParamConfig } from '../types/types'

export function addToTree(tree: ITree, config: ParamConfig, index = 0) {
    const val = config.shortName
    if (val == null) return tree
    if (val.length === 0) return tree
    if (val.length === index) {
        tree.val = config
        return tree
    }
    const char = val[index]
    let branch = tree.char[char]
    if (branch == null) {
        branch = tree.char[char] = { char: {} }
    }
    addToTree(branch, config, index + 1)
    return tree
}

export function getFromTree(tree: ITree, val: string, index = 0): { config: ParamConfig, index: number } | null {
    if (val.length == 0 || val.length <= index) return null
    const char = val[index]
    const branch = tree.char[char]
    if (branch == null) return null
    if (branch.val != null) return { config: branch.val, index: index + 1 }
    return getFromTree(branch, val, index + 1)
}

export interface ITree {
    char: { [key: string]: ITree }
    val?: ParamConfig
}