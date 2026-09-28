[ req ]
distinguished_name = dn
prompt             = no
req_extensions     = req_ext

# Replace values in this section with your own information.

[ dn ]
C  = US                    # 2-letter country code
ST = New-York              # State or province
L  = New York City         # City or locality
O  = Example Corp          # Organization name
CN = mongo0.example.com    # Hostname of your MongoDB node

[ req_ext ]
subjectAltName = @alt_names
keyUsage = digitalSignature
extendedKeyUsage = serverAuth

# Replace values in this section with any alternative
# hostnames or IP addresses for your MongoDB node.

[ alt_names ]
DNS.1 = mongo0.example.com
DNS.2 = localhost
IP.1 = 127.0.0.1