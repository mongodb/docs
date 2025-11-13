{
    // start-custom-credentials
    const { MongoClient } = require('mongodb');
    const { fromNodeProviderChain } = require('@aws-sdk/credential-providers');

    const client = new MongoClient('<cluster_url>?authMechanism=MONGODB-AWS', {
        authMechanismProperties: {
            AWS_CREDENTIAL_PROVIDER: fromNodeProviderChain()
        }
    });
    // end-custom-credentials
}

{
    // start-custom-credentials-function
    const { MongoClient } = require('mongodb');

    const client = new MongoClient('<cluster_url>?authMechanism=MONGODB-AWS', {
        authMechanismProperties: {
            AWS_CREDENTIAL_PROVIDER: async () => {
                return {
                    accessKeyId: process.env.ACCESS_KEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY
                }
            }
        }
    });
    // end-custom-credentials-function
}