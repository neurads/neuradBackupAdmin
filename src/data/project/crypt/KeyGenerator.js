const jwt = require("jsonwebtoken");

async function generateToken(data,jwtPrivateKey) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, jwtPrivateKey, { algorithm: 'RS256'}, function(error, token) {
            if(error){
                reject({message : error.message});
            }else {
                resolve(token);
            }
        });
    })
}

module.exports.generateToken = {generateToken};
