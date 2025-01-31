# start-enable-tls-settings
client = Mongo::Client.new(["<hostname>:<port>"], 
  ssl: true,
  ssl_cert: 'path/to/client.crt',
  ssl_key: 'path/to/client.key',
  ssl_ca_cert: 'path/to/ca.crt'
)
# end-enable-tls-settings

# start-enable-tls-settings-same-file
client = Mongo::Client.new(["<hostname>:<port>"],
  ssl: true,
  ssl_cert: 'path/to/client.pem',
  ssl_key: 'path/to/client.pem',
  ssl_ca_cert: 'path/to/ca.crt',
)
# end-enable-tls-settings-same-file

# start-enable-tls-uri
client = Mongo::Client.new(
  "mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=path%2fto%2fclient.pem&tlsCAFile=path%2fto%2fca.crt")
# end-enable-tls-uri

# start-modify-context
Mongo.tls_context_hooks.push(
  Proc.new { |context|
    context.ciphers = ["AES256-SHA"]
  }
)
# end-modify-context

# start-ssl-verify
client = Mongo::Client.new(["<hostname>:<port>"],
  ssl: true,
  ssl_verify: false
)
# end-ssl-verify

# start-tls-insecure
client = Mongo::Client.new('mongodb://<hostname>:<port>/?tls=true&tlsInsecure=true')
# end-tls-insecure
