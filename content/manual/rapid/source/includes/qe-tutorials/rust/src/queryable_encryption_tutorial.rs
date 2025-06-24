use mongodb::{
    bson::{doc, Document, Bson},
    Client, Namespace, Collection
};
use dotenv::dotenv;
use std::env;

mod queryable_encryption_helpers;
use queryable_encryption_helpers as helpers;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    dotenv().ok();
    // start-setup-application-variables
    let kms_provider_name = "<KMS provider name>";
    
    let uri = env::var("MONGODB_URI").expect("Set MONGODB_URI environment variable to your connection string");

    let key_vault_database_name = "encryption";
    let key_vault_collection_name = "__keyVault";
    let key_vault_namespace = Namespace::new(key_vault_database_name, key_vault_collection_name);
    let encrypted_database_name = "medicalRecords";
    let encrypted_collection_name = "patients";
    // end-setup-application-variables

    let kms_provider_credentials = helpers::get_kms_provider_credentials(&kms_provider_name);
    let customer_master_key_credentials = helpers::get_customer_master_key_credentials(&kms_provider_name);

    let encrypted_client_builder = helpers::get_auto_encryption_options(&key_vault_namespace, &kms_provider_credentials);

    // start-create-client
    let encrypted_client = encrypted_client_builder
        .extra_options(Some(doc!{
            "cryptSharedLibPath": env::var("SHARED_LIB_PATH").expect("Set SHARED_LIB_PATH environment variable to path to crypt_shared library")
        }))
        .key_vault_client(Client::with_uri_str(uri).await.unwrap())
        .build()
        .await
        .unwrap();
    // end-create-client

    encrypted_client.database(key_vault_database_name).collection::<Document>(key_vault_collection_name).drop().await?;
    encrypted_client.database(encrypted_database_name).collection::<Document>(encrypted_collection_name).drop().await?;

    // start-encrypted-fields-map
    let encrypted_fields_map = doc! {
        "fields": [
            {
                "path":     "patientRecord.ssn",
                "bsonType": "string",
                "keyId":    Bson::Null,
                "queries": { "queryType": "equality" },
            },
            {
                "path":     "patientRecord.billing",
                "bsonType": "object",
                "keyId":    Bson::Null,
            },
        ]
    };
    // end-encrypted-fields-map
    
    let client_encryption = helpers::get_client_encryption(&encrypted_client, &key_vault_namespace, &kms_provider_credentials);

    // start-create-encrypted-collection
    client_encryption.create_encrypted_collection(
        &encrypted_client.database(encrypted_database_name), 
        encrypted_collection_name,
        customer_master_key_credentials
    )
    .encrypted_fields(encrypted_fields_map)
    .await
    .1?;
    // end-create-encrypted-collection

    // start-insert-document
    let patient_document = doc! {
        "patientName": "Jon Doe",
        "patientId": 12345678,
        "patientRecord": {
            "ssn": "987-65-4320",
            "billing": {
                "type": "Visa",
                "number": "4111111111111111",
            },
            "billAmount": 1500,
        }
    };

    let encrypted_coll: Collection<Document>  = encrypted_client
        .database(encrypted_database_name)
        .collection(encrypted_collection_name);

    let insert_result = encrypted_coll.insert_one(patient_document).await?;
    // end-insert-document

    println!("Successfully inserted document with ID {:?}", insert_result.inserted_id);

    // start-find-document
    let find_result = encrypted_coll.find_one(doc! {"patientRecord.ssn": "987-65-4320"}).await?;

    match find_result {
        Some(document) => println!("{:?}", document),
        None => println!("Document not found"),
    }
    // end-find-document
    
    return Ok(());
}