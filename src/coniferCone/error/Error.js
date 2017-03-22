/**
 * Created by work on 2017/3/22.
 */


function throwMissingParameterError() {
    throw new Error('Missing parameter!');
}

function throwWrongNumberOfParameterError() {
    throw new Error('the number of parameters in the wrong!')
}

export {throwMissingParameterError,throwWrongNumberOfParameterError}