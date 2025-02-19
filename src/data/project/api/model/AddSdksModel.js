const joi = require("joi");

const sdks = [
    'AD_MOB',
    'AD_MANAGER',
    'FAN',
    'TABOOLA'
]

const addSdksModel = joi.array().items(joi.object({
    sdk : joi.string().valid(...sdks).required(),
    key : joi.string().min(5).required()
}))

module.exports.addSdksModel = addSdksModel
