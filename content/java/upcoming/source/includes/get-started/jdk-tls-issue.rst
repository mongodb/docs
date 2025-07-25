.. important:: TLS v1.3 Connection Error

   If your application generates an error that resembles the following
   code, you might need to update your JDK to the latest patch release:

   .. code-block:: none
      :copyable: false

      javax.net.ssl.SSLHandshakeException: extension (5) should not be presented in certificate_request

   This exception is a known issue when using the TLS 1.3 protocol with
   some JDK versions. To resolve the error, update your JDK to one of
   the following versions, or a newer version:

   - JDK 11.0.7
   - JDK 13.0.3
   - JDK 14.0.2