If you set :option:`--tlsMode <mongod --tlsMode>`  to any value other than ``disabled``, MongoDB 
uses the certificate specified in :setting:`net.tls.certificateKeyFile`
for both server and client authentication in internal replica set 
connections. This certificate setting applies regardless of 
whether you set :setting:`security.clusterAuthMode` to ``X.509``.