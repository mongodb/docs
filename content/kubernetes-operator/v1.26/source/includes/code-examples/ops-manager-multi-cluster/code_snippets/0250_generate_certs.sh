mkdir certs || true

cat <<EOF >certs/ca.cnf
[ req ]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn

[ dn ]
C=US
ST=New York
L=New York
O=Example Company
OU=IT Department
CN=exampleCA
EOF

cat <<EOF >certs/om.cnf
[ req ]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn
req_extensions     = req_ext

[ dn ]
C=US
ST=New York
L=New York
O=Example Company
OU=IT Department
CN=${OPS_MANAGER_EXTERNAL_DOMAIN}

[ req_ext ]
subjectAltName = @alt_names
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth

[ alt_names ]
DNS.1 = ${OPS_MANAGER_EXTERNAL_DOMAIN}
DNS.2 = om-svc.${NAMESPACE}.svc.cluster.local
EOF

cat <<EOF >certs/appdb.cnf
[ req ]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn
req_extensions     = req_ext

[ dn ]
C=US
ST=New York
L=New York
O=Example Company
OU=IT Department
CN=AppDB

[ req_ext ]
subjectAltName = @alt_names
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth

[ alt_names ]
# multi-cluster mongod hostnames from service for each pod
DNS.1 = *.${NAMESPACE}.svc.cluster.local
# single-cluster mongod hostnames from headless service
DNS.2 = *.om-db-svc.${NAMESPACE}.svc.cluster.local
EOF

# generate CA keypair and certificate
openssl genrsa -out certs/ca.key 2048
openssl req -x509 -new -nodes -key certs/ca.key -days 1024 -out certs/ca.crt -config certs/ca.cnf

# generate OpsManager's keypair and certificate
openssl genrsa -out certs/om.key 2048
openssl req -new -key certs/om.key -out certs/om.csr -config certs/om.cnf

# generate AppDB's keypair and certificate
openssl genrsa -out certs/appdb.key 2048
openssl req -new -key certs/appdb.key -out certs/appdb.csr -config certs/appdb.cnf

# generate certificates signed by CA for OpsManager and AppDB
openssl x509 -req -in certs/om.csr -CA certs/ca.crt -CAkey certs/ca.key -CAcreateserial -out certs/om.crt -days 365 -sha256 -extfile certs/om.cnf -extensions req_ext
openssl x509 -req -in certs/appdb.csr -CA certs/ca.crt -CAkey certs/ca.key -CAcreateserial -out certs/appdb.crt -days 365 -sha256 -extfile certs/appdb.cnf -extensions req_ext
