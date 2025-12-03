#start-manage-imported-keys
$cert = "client.pem"

# Compute the SHA256 fingerprint:
$fingerprint = (openssl x509 -in $cert -noout -fingerprint -sha256) -replace 'SHA256 Fingerprint=', '' -replace ':', ''

if (Select-String -Path $cert -Pattern '-----BEGIN RSA PRIVATE KEY-----' -Quiet) {
    # Key name for PKCS#1 key:
    $key_name = "libmongoc-$fingerprint-pkcs1"
    $csp = "Microsoft Enhanced Cryptographic Provider v1.0"
} elseif (Select-String -Path $cert -Pattern '-----BEGIN PRIVATE KEY-----' -Quiet) {
    # Key name for PKCS#8 key:
    $key_name = "libmongoc-$fingerprint-pkcs8"
    $csp = "Microsoft Software Key Storage Provider"
} else {
    Write-Output "Unexpected PEM format for $cert"
}
#end-manage-imported-keys

#start-view-key
certutil -user -csp $csp -key $key_name
#end-view-key

#start-delete-key
certutil -user -csp $csp -delkey $key_name
#end-delete-key