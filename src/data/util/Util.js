const {validateAuthWithRoles } = require("ferbotz-certify")


function notNullOrEmpty(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

async function validateAuthAndName(req, roles){
    await validateAuthWithRoles(req.headers['authorization'], roles)
    const projectName = req.params.name;
    if (notNullOrEmpty(projectName)){
        return projectName;
    }else {
        const e =  new Error('No token provided.')
        e.code = 400
        throw e;
    }
}



function throwError(status , message){
    const e =  new Error(message)
    e.code = status || 500;
    throw e;
}

module.exports = {
    nnoe : notNullOrEmpty,
    validateAuthAndName,
    throwError
}