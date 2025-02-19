const joi = require('joi')

const addAndroidModel = joi.object({
    pkg : joi.string().pattern(/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/).required(),
})

module.exports.addAndroidModel = addAndroidModel;
