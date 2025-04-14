- `OCSP stapling <https://tools.ietf.org/html/rfc6961>`__. With OCSP
  stapling, :binary:`~bin.mongod` and :binary:`~bin.mongos` instances
  attach or "staple" the OCSP status response to their certificates
  when providing these certificates to clients during the TLS/SSL
  handshake. By including the OCSP status response with the
  certificates, OCSP stapling obviates the need for clients to make a
  separate request to retrieve the OCSP status of the provided
  certificates.

- `OCSP must-staple extension <https://tools.ietf.org/html/rfc7633>`__.
  OCSP must-staple is an extension that can be added to the server
  certificate that tells the client to expect an OCSP staple when it
  receives a certificate during the TLS/SSL handshake.
