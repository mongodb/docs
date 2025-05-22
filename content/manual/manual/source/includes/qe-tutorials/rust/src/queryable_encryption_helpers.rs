use mongodb::{
    bson::{doc, Document, Binary, spec::BinarySubtype},
    client_encryption::{
        ClientEncryption,
        MasterKey,
        AwsMasterKey,
        AzureMasterKey,
        GcpMasterKey,
        KmipMasterKey,
        LocalMasterKey,
        EncryptedClientBuilder
    },
    mongocrypt::ctx::KmsProvider,
    options::{ClientOptions, TlsOptions},
    Client, Namespace,
};
use dotenv::dotenv;
use std::env;

use rand::RngCore;
use std::fs::{self, OpenOptions};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};

pub fn get_kms_provider_credentials(kms_provider_name: &str) -> Vec<(KmsProvider, Document, Option<TlsOptions>)> {
    let mut kms_providers: Vec<(KmsProvider, Document, Option<TlsOptions>)> = Vec::new();

    match kms_provider_name {
        "aws" => {
            // start-aws-kms-credentials
            kms_providers = vec![(
                KmsProvider::aws(),
                doc! {
                    "accessKeyId": env::var("AWS_ACCESS_KEY_ID").expect("Set AWS_ACCESS_KEY_ID environment variable"),
                    "secretAccessKey": env::var("AWS_SECRET_ACCESS_KEY").expect("Set AWS_SECRET_ACCESS_KEY environment variable"),
                },
                None,
            )];
            // end-aws-kms-credentials
        },
        "azure" => {
            // start-azure-kms-credentials
            kms_providers = vec![(
                KmsProvider::azure(),
                doc! {
                    "tenantId": env::var("AZURE_TENANT_ID").expect("Set AZURE_TENANT_ID environment variable"),
                    "clientId": env::var("AZURE_CLIENT_ID").expect("Set AZURE_CLIENT_ID environment variable"),
                    "clientSecret": env::var("AZURE_CLIENT_SECRET").expect("AZURE_CLIENT_SECRET environment variable"),
                },
                None,
            )];
            // end-azure-kms-credentials
        },
        "gcp" => {
            // start-gcp-kms-credentials
            kms_providers = vec![(
                KmsProvider::gcp(),
                doc! {
                    "email": env::var("GCP_EMAIL").expect("Set GCP_EMAIL environment variable"),
                    "privateKey": env::var("GCP_PRIVATE_KEY").expect("Set GCP_PRIVATE_KEY environment variable"),
                },
                None,
            )];
            // end-gcp-kms-credentials
        },
        "kmip" => {
            // start-kmip-kms-credentials
            kms_providers = vec![(
                KmsProvider::kmip(),
                doc! {
                    "endpoint": env::var("KMIP_KMS_ENDPOINT").expect("Set KMIP_KMS_ENDPOINT environment variable")
                },
                Some(get_kmip_tls_options()),
            )];
            // end-kmip-kms-credentials
        },
        "local" => {
            // start-generate-local-key
            let key_file_path = "customer-master-key.txt";
            let mut local_key = Vec::new();
        
            if !Path::new(key_file_path).exists() {
                let mut key = [0u8; 96];
                rand::thread_rng().fill_bytes(&mut key);
        
                // Write the key to the file
                match OpenOptions::new().write(true).create(true).open(key_file_path) {
                    Ok(mut file) => {
                        if let Err(err) = file.write_all(&key) {
                            panic!("Unable to write Customer Master Key to file: {}", err);
                        }
                    }
                    Err(err) => panic!("Unable to create Customer Master Key file: {}", err),
                }
                local_key = key.to_vec();
            } 
            // end-generate-local-key
            else
            // start-get-local-key
            {
                // WARNING: Do not use a local key file in a production application
                match fs::File::open(key_file_path) {
                    Ok(mut file) => {
                        if let Err(err) = file.read_to_end(&mut local_key) {
                            panic!("Unable to read Customer Master Key file: {}", err);
                        }
                    }
                    Err(err) => panic!("Unable to open Customer Master Key file: {}", err),
                }

                if local_key.len() != 96 {
                    panic!("Expected the customer master key file to be 96 bytes.");
                }
            }
            let binary_key = Binary {
                subtype: BinarySubtype::Generic,
                bytes: local_key,
            };
            kms_providers = vec![(
                KmsProvider::local(),
                doc! {
                    "key": binary_key,
                },
                None,
            )];
            // end-get-local-key
        },
        &_ => {
            panic!("Specify a valid KMS provider name.")
        }
    }
    return kms_providers;
}

pub fn get_customer_master_key_credentials(kms_provider_name: &str) -> MasterKey {

    match kms_provider_name {
        "aws" => {
            // start-aws-cmk-credentials
            let aws_master_key = AwsMasterKey::builder()
                .key(env::var("AWS_KEY_ARN").expect("Set the AWS_KEY_ARN environment variable"))
                .region(env::var("AWS_KEY_REGION").expect("Set the AWS_KEY_REGION environment variable"))
                .build();
            // end-aws-cmk-credentials
            return MasterKey::Aws(aws_master_key);
        },
        "azure" => {
            // start-azure-cmk-credentials
            let azure_master_key = AzureMasterKey::builder()
                .key_vault_endpoint(env::var("AZURE_KEY_VAULT_ENDPOINT").expect("Set the AZURE_KEY_VAULT_ENDPOINT environment variable"))
                .key_name(env::var("AZURE_KEY_NAME").expect("Set the AZURE_KEY_NAME environment variable"))
                .build();
            // end-azure-cmk-credentials
            return MasterKey::Azure(azure_master_key);
        },
        "gcp" => {
            // start-gcp-cmk-credentials
            let gcp_master_key = GcpMasterKey::builder()
                .project_id(env::var("GCP_PROJECT_ID").expect("Set the GCP_PROJECT_ID environment variable"))
                .location(env::var("GCP_LOCATION").expect("Set the GCP_LOCATION environment variable"))
                .key_ring(env::var("GCP_KEY_RING").expect("Set the GCP_KEY_RING environment variable"))
                .key_name(env::var("GCP_KEY_NAME").expect("Set the GCP_KEY_NAME environment variable"))
                .build();
            // end-gcp-cmk-credentials
            return MasterKey::Gcp(gcp_master_key);
        },
        "kmip" => {
            // start-kmip-cmk-credentials
            let kmip_master_key = KmipMasterKey::builder().build();
            // end-kmip-cmk-credentials
            return MasterKey::Kmip(kmip_master_key);
        },
        "local" => {
            // start-local-cmk-credentials
            let local_master_key = LocalMasterKey::builder().build();
            // end-local-cmk-credentials
            return MasterKey::Local(local_master_key);
        },
        &_ => {
            panic!("Specify a valid KMS provider name.")
        }
    }
}

pub fn get_auto_encryption_options(key_vault_namespace: &Namespace, kms_providers: &Vec<(KmsProvider, Document, Option<TlsOptions>)>) -> EncryptedClientBuilder {
    // start-auto-encryption-options
    let client_options = ClientOptions::builder().build();

    let builder = Client::encrypted_builder(
        client_options,
        key_vault_namespace.clone(),
        kms_providers.clone()
    ).expect("");
    // end-auto-encryption-options
    return builder;
}

pub fn get_kmip_tls_options() -> TlsOptions {
    // start-tls-options
    let ca_file = env::var("KMIP_TLS_CA_FILE").expect("Set the KMIP_TLS_CA_FILE environment variable");
    let cert_file = env::var("KMIP_TLS_CERT_FILE").expect("Set the KMIP_TLS_CERT_FILE environment variable");
    
    let tls_options = TlsOptions::builder()
        .ca_file_path(PathBuf::from(ca_file))
        .cert_key_file_path(PathBuf::from(cert_file))
        .build();
    // end-tls-options
    return tls_options;
}

pub fn get_client_encryption(encrypted_client: &Client, key_vault_namespace: &Namespace, kms_providers: &Vec<(KmsProvider, Document, Option<TlsOptions>)>) -> ClientEncryption {
    // start-client-encryption
    let client_encryption = ClientEncryption::new(
        encrypted_client.clone(),
        key_vault_namespace.clone(),
        kms_providers.clone(),
    )
    .unwrap();
    // end-client-encryption
    return client_encryption;
}