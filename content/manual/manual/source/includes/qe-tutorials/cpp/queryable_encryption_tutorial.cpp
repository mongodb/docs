#include <cstdlib>
#include <fstream>
#include <iostream>
#include <random>
#include <stdexcept>
#include <string>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/types.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/client_encryption.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/options/auto_encryption.hpp>
#include <mongocxx/options/client.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

namespace {

std::string getenv_or_throw(char const* name) {
    char const* value = std::getenv(name);
    if (!value) {
        throw std::runtime_error(std::string("Set the ") + name + " environment variable");
    }
    return std::string(value);
}

// start-get-kms-provider-credentials
bsoncxx::document::value get_kms_provider_credentials(std::string const& kms_provider_name) {
    if (kms_provider_name == "local") {
        // start-generate-local-key
        std::string const key_file_path = "customer-master-key.txt";
        std::string key;

        if (std::ifstream key_file_in{key_file_path, std::ios::binary}; key_file_in) {
            key.assign(std::istreambuf_iterator<char>(key_file_in), std::istreambuf_iterator<char>());
            if (key.size() != 96) {
                throw std::runtime_error("Expected the customer master key file to be 96 bytes.");
            }
        } else {
            std::random_device random_device;
            std::mt19937 generator(random_device());
            std::uniform_int_distribution<int> distribution(0, 255);

            key.resize(96);
            for (auto& byte : key) {
                byte = static_cast<char>(distribution(generator));
            }

            std::ofstream key_file_out(key_file_path, std::ios::binary);
            key_file_out.write(key.data(), static_cast<std::streamsize>(key.size()));
        }
        // end-generate-local-key

        bsoncxx::types::b_binary const binary_key{
            bsoncxx::binary_sub_type::k_binary,
            static_cast<uint32_t>(key.size()),
            reinterpret_cast<uint8_t const*>(key.data())};

        return make_document(kvp("local", make_document(kvp("key", binary_key))));
    }

    if (kms_provider_name == "aws") {
        // start-aws-kms-credentials
        return make_document(kvp("aws", make_document(
            kvp("accessKeyId", getenv_or_throw("AWS_ACCESS_KEY_ID")),
            kvp("secretAccessKey", getenv_or_throw("AWS_SECRET_ACCESS_KEY")))));
        // end-aws-kms-credentials
    }

    if (kms_provider_name == "azure") {
        // start-azure-kms-credentials
        return make_document(kvp("azure", make_document(
            kvp("tenantId", getenv_or_throw("AZURE_TENANT_ID")),
            kvp("clientId", getenv_or_throw("AZURE_CLIENT_ID")),
            kvp("clientSecret", getenv_or_throw("AZURE_CLIENT_SECRET")))));
        // end-azure-kms-credentials
    }

    if (kms_provider_name == "gcp") {
        // start-gcp-kms-credentials
        return make_document(kvp("gcp", make_document(
            kvp("email", getenv_or_throw("GCP_EMAIL")),
            kvp("privateKey", getenv_or_throw("GCP_PRIVATE_KEY")))));
        // end-gcp-kms-credentials
    }

    if (kms_provider_name == "kmip") {
        // start-kmip-kms-credentials
        return make_document(kvp("kmip", make_document(
            kvp("endpoint", getenv_or_throw("KMIP_KMS_ENDPOINT")))));
        // end-kmip-kms-credentials
    }

    throw std::runtime_error("Specify a valid KMS provider name.");
}
// end-get-kms-provider-credentials

// start-get-customer-master-key-credentials
bsoncxx::document::value get_customer_master_key_credentials(std::string const& kms_provider_name) {
    if (kms_provider_name == "kmip" || kms_provider_name == "local") {
        // start-kmip-local-cmk-credentials
        return make_document();
        // end-kmip-local-cmk-credentials
    }

    if (kms_provider_name == "aws") {
        // start-aws-cmk-credentials
        return make_document(
            kvp("key", getenv_or_throw("AWS_KEY_ARN")),
            kvp("region", getenv_or_throw("AWS_KEY_REGION")));
        // end-aws-cmk-credentials
    }

    if (kms_provider_name == "azure") {
        // start-azure-cmk-credentials
        return make_document(
            kvp("keyVaultEndpoint", getenv_or_throw("AZURE_KEY_VAULT_ENDPOINT")),
            kvp("keyName", getenv_or_throw("AZURE_KEY_NAME")));
        // end-azure-cmk-credentials
    }

    if (kms_provider_name == "gcp") {
        // start-gcp-cmk-credentials
        return make_document(
            kvp("projectId", getenv_or_throw("GCP_PROJECT_ID")),
            kvp("location", getenv_or_throw("GCP_LOCATION")),
            kvp("keyRing", getenv_or_throw("GCP_KEY_RING")),
            kvp("keyName", getenv_or_throw("GCP_KEY_NAME")));
        // end-gcp-cmk-credentials
    }

    throw std::runtime_error("Specify a valid KMS provider name.");
}
// end-get-customer-master-key-credentials

// start-get-auto-encryption-options
mongocxx::options::auto_encryption get_auto_encryption_options(
    std::string const& kms_provider_name,
    std::pair<std::string, std::string> const& key_vault_namespace,
    bsoncxx::document::view const& kms_providers) {
    // start-auto-encryption-options
    mongocxx::options::auto_encryption auto_encryption_opts{};
    auto_encryption_opts.key_vault_namespace(key_vault_namespace);
    auto_encryption_opts.kms_providers(kms_providers);
    auto_encryption_opts.extra_options(make_document(
        kvp("cryptSharedLibPath", getenv_or_throw("SHARED_LIB_PATH"))));
    // end-auto-encryption-options

    if (kms_provider_name == "kmip") {
        // start-kmip-tls-options
        auto_encryption_opts.tls_opts(make_document(kvp("kmip", make_document(
            kvp("tlsCAFile", getenv_or_throw("KMIP_TLS_CA_FILE")),
            kvp("tlsCertificateKeyFile", getenv_or_throw("KMIP_TLS_CERT_FILE"))))));
        // end-kmip-tls-options
    }

    return auto_encryption_opts;
}
// end-get-auto-encryption-options

// start-get-client-encryption
mongocxx::client_encryption get_client_encryption(
    std::string const& kms_provider_name,
    mongocxx::client& encrypted_client,
    std::pair<std::string, std::string> const& key_vault_namespace,
    bsoncxx::document::view const& kms_providers) {
    // start-client-encryption
    mongocxx::options::client_encryption client_encryption_opts{};
    client_encryption_opts.key_vault_namespace(key_vault_namespace);
    client_encryption_opts.key_vault_client(&encrypted_client);
    client_encryption_opts.kms_providers(kms_providers);
    // end-client-encryption

    if (kms_provider_name == "kmip") {
        // start-kmip-client-encryption
        client_encryption_opts.tls_opts(make_document(kvp("kmip", make_document(
            kvp("tlsCAFile", getenv_or_throw("KMIP_TLS_CA_FILE")),
            kvp("tlsCertificateKeyFile", getenv_or_throw("KMIP_TLS_CERT_FILE"))))));
        // end-kmip-client-encryption
    }

    return mongocxx::client_encryption(std::move(client_encryption_opts));
}
// end-get-client-encryption

} // namespace

int main() {
    mongocxx::instance instance{};

    // start-setup-application-variables
    std::string const kms_provider_name = "<KMS provider name>";
    std::string const uri = std::getenv("MONGODB_URI") ? std::getenv("MONGODB_URI") : "";
    std::string const key_vault_database_name = "encryption";
    std::string const key_vault_collection_name = "__keyVault";
    std::pair<std::string, std::string> const key_vault_namespace{key_vault_database_name, key_vault_collection_name};
    std::string const encrypted_database_name = "medicalRecords";
    std::string const encrypted_collection_name = "patients";
    // end-setup-application-variables

    // start-get-credentials-and-options
    auto const kms_providers = get_kms_provider_credentials(kms_provider_name);
    auto const customer_master_key = get_customer_master_key_credentials(kms_provider_name);

    auto auto_encryption_opts =
        get_auto_encryption_options(kms_provider_name, key_vault_namespace, kms_providers.view());
    // end-get-credentials-and-options

    // start-create-client
    mongocxx::options::client client_opts{};
    client_opts.auto_encryption_opts(std::move(auto_encryption_opts));

    mongocxx::client encrypted_client{mongocxx::uri{uri}, client_opts};
    // end-create-client

    encrypted_client.database(key_vault_database_name).collection(key_vault_collection_name).drop();
    encrypted_client.database(encrypted_database_name).collection(encrypted_collection_name).drop();

    // start-create-client-encryption
    auto client_encryption =
        get_client_encryption(kms_provider_name, encrypted_client, key_vault_namespace, kms_providers.view());
    // end-create-client-encryption

    // start-encrypted-fields-map
    auto const encrypted_fields = make_document(kvp("fields", bsoncxx::builder::basic::make_array(
        make_document(
            kvp("path", "patientRecord.ssn"),
            kvp("bsonType", "string"),
            kvp("keyId", bsoncxx::types::b_null{}),
            kvp("queries", make_document(kvp("queryType", "equality")))),
        make_document(
            kvp("path", "patientRecord.billing"),
            kvp("bsonType", "object"),
            kvp("keyId", bsoncxx::types::b_null{})))));
    // end-encrypted-fields-map

    // start-create-encrypted-collection
    auto const create_collection_options = make_document(kvp("encryptedFields", encrypted_fields.view()));
    bsoncxx::document::value created_collection_options = make_document();

    auto encrypted_collection = client_encryption.create_encrypted_collection(
        encrypted_client.database(encrypted_database_name),
        encrypted_collection_name,
        create_collection_options.view(),
        created_collection_options,
        kms_provider_name,
        customer_master_key.view());
    // end-create-encrypted-collection

    // start-insert-document
    auto const patient_document = make_document(
        kvp("patientName", "Jon Doe"),
        kvp("patientId", 12345678),
        kvp("patientRecord", make_document(
            kvp("ssn", "987-65-4320"),
            kvp("billing", make_document(
                kvp("type", "Visa"),
                kvp("number", "4111111111111111"))),
            kvp("billAmount", 1500))));

    encrypted_collection.insert_one(patient_document.view());
    // end-insert-document

    // start-find-document
    auto const find_result = encrypted_collection.find_one(
        make_document(kvp("patientRecord.ssn", "987-65-4320")));

    if (find_result) {
        std::cout << bsoncxx::to_json(*find_result) << std::endl;
    } else {
        std::cout << "Document not found" << std::endl;
    }
    // end-find-document

    return 0;
}
