const router = require('express').Router();
const {validateAuthAndName} = require('../../../util/Util')
const CONSTANTS = require('../../../Constants').CONSTANTS
const projectDbModel = require('../../../../app').projectDbModel;
const { createBucket } = require('../../../../app').configMethods
require("dotenv").config();
const email = process.env.EMAIL

router.post('/:name/create', async(req, res) => {
    try{
        const projectName =  await validateAuthAndName(req,CONSTANTS.ADMIN_ROLES)
        try{
            const createBucketData = {bucketName : projectName , email : email }
            await createBucket(
                req.headers['authorization'] ,
                createBucketData ,
                async (bucket , session) => {
                    try{
                        const project = await projectDbModel.create({
                            name: projectName
                        });
                        res.status(200).json({
                            project : project,
                            bucket : bucket
                        });
                        await session.commitTransaction();
                    }catch(error){
                        let message
                        if(error.code === 11000){
                            message = `Project with name ${projectName} already exists`
                        }else{
                            message = "Internal server error"
                        }
                        res.status(500).json({error: message});
                        await session.abortTransaction();
                    } finally {
                        await session.endSession();
                    }
                }
            )
        }catch(error){
            res.status(error.code).json({
                message: "Failed to create ReKon Bucket",
                cause : error.message
            });
        }
    }catch(error){
        res.status(error.code).json({message: error.message});
    }
})

module.exports.projectRouter = router;
