const config = {
    development : {
       mongodb_uri: process.env.MONGODB_URI_DEV
    },
    testing : {
       mongodb_uri: process.env.MONGODB_URI_TEST
    }
} 

module.exports = config