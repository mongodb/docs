kms_provider_credentials = {
    "azure:my_azure_provider": {
        "tenantId": os.environ['AZURE_TENANT_ID'], # Your Azure tenant ID
        "clientId": os.environ['AZURE_CLIENT_ID'], # Your Azure client ID
        "clientSecret": os.environ['AZURE_CLIENT_SECRET'] # Your Azure client secret
    }
}