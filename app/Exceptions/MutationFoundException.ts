import { Exception } from '@poppinss/utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new MutationFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class MutationFoundException extends Exception {
    constructor(message: string = 'Mutation found in DNA sequence.') {
        super(message, 403)
    }
}
