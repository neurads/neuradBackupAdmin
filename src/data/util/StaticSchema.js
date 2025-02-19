const joi = require('joi');

const adNetworks = [
    'AD_MOB',
    'AD_MANAGER',
    'FAN',
    'TABOOLA'
]

const adTypes = [
    'REWARDED_INTERSTITIAL',
    'REWARDED',
    'INTERSTITIAL',
    'APP_OPEN',
    'SCROLL',
    'BANNER',
    'ADAPTIVE',
    'NATIVE',
    'STICKY'
]

const adKinds = [
    'ROAD_BLOCKER',
    'APP_OPEN',
    'FULL_SCREEN_BANNER',
    'BANNER',
    'STICKY'
]

const adPlacements = [
    'DEFAULT',
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'ELEVEN',
    'TWELVE',
    'THIRTEEN',
    'FOURTEEN',
    'FIFTEEN',
    'SIXTEEN',
    'SEVENTEEN',
    'EIGHTEEN',
    'NINETEEN',
    'TWENTY',
    'TWENTY_ONE',
    'TWENTY_TWO',
    'TWENTY_THREE',
    'TWENTY_FOUR',
    'TWENTY_FIVE'
]

const backupAdMetaDataSchema = joi.object({
    data : joi.array().items(joi.object({
        id : joi.string().min(1).required(),
        description : joi.string().min(1).required(),
        network : joi.string().valid(...adNetworks).required(),
        adType : joi.string().valid(...adTypes).required(),
        credential : joi.object().required()
    })).required(),
}).unknown(false).required()

const backupAdPlacementDataSchema = joi.object({
    data : joi.array().items(joi.object({
        adKind : joi.string().valid(...adKinds).required(),
        adPlacement : joi.string().valid(...adPlacements).required(),
        adMetaDataId : joi.string().min(1).required()
    })).required(),
}).unknown(false).required()

const staticSchemas = {
    'backup_ad_meta_data' : backupAdMetaDataSchema,
    'backup_ad_placement_data' : backupAdPlacementDataSchema
}

module.exports = staticSchemas;

