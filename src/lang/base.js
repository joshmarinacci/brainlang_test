export class Primitive {
    constructor() {
    }
    log(...args) {
        console.log(this.constructor.name,...args)
    }
}

export const is_error_result = (result) => result instanceof Error
export const is_scalar = (a) => a&&a.type === 'scalar'
export const is_string = (val) => /*(val instanceof NString ||*/ (typeof val === 'string')
export const is_list = (b) => b&&b.type === 'list'

