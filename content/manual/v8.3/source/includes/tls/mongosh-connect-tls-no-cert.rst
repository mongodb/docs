.. code-block:: bash

   mongosh "mongodb://mongo0.example.com:27017,mongo1.example.com:27017,mongo2.example.com:27017" \
       --tls --tlsCAFile /etc/ssl/mongodb/ca.pem

- :option:`--tls <mongosh --tls>` enables TLS encryption
  for the connection.
- :option:`--tlsCAFile <mongosh --tlsCAFile>` is set to the CA
  certificate that signed the server certificates so that
  ``mongosh`` can verify the server's certificates.
