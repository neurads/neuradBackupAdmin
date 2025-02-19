console.log("started neurad Backup Admin");
require('dotenv').config();
const { initFerbotzAuth } = require('ferbotz-auth');
const staticSchema = require('./data/util/StaticSchema')
const { initFerbotzRekon } = require('ferbotz-rekon');
let projectDbModel = null
let configMethods = null

// api setup
const express = require('express');
const app = express()
const port = process.env.PORT || 8082
app.use(express.json())

// database setup
const mongoose = require('mongoose');

initFerbotzAuth(
    {
        sqlHost : process.env.AUTH_SQL_HOST,
        sqlUser : process.env.AUTH_SQL_USER_NAME,
        sqlPassword : process.env.AUTH_SQL_PWD,
        sqlDatabase : process.env.AUTH_SQL_DATABASE,
        sqlPort : process.env.AUTH_SQL_PORT,
        express : app
    }
)

initFerbotzRekon(
    {
        express : app,
        mongoUrl : process.env.MONGO_URL
    },
    (error) => {
        if(!error) {
            console.log("rekon init successful")
            configMethods = require('ferbotz-rekon').configMethods
            mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            const mongooseConnection = mongoose.connection
            mongooseConnection.on('error', (err) => {
                console.log("mongo failed to init in neurad" + err )

            })
            mongooseConnection.on('open', () => {
                console.log("mongodb connected to neurad")
                const mProjectDbModel = require('./data/project/database/model/ProjectDbModel')
                projectDbModel = mProjectDbModel(mongooseConnection)
                app.use("/backup/project", require('./data/project/api/router/ProjectRouter').projectRouter)
                app.listen(port, () => {
                    console.log(`Server started on port ${port}`)
                })
            })
        }else{
            if(error.code === 1){
                console.log("failed to init rekon mongo")
                console.log(error.error)
            }else{
                console.log(error)
            }
        }
    },
    staticSchema
)

module.exports = {
    get projectDbModel() { return projectDbModel; },
    get configMethods() { return configMethods; }
}

