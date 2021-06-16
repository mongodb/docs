.. note:: Known connection issue when using TLS v1.3

   If you encounter an error connecting to your MongoDB instance or cluster
   that resembles the following while running your application, you may need
   to update your JDK to the latest patch release:

   .. code-block:: none
      :copyable: false

      javax.net.ssl.SSLHandshakeException: extension (5) should not be presented in certificate_request

   This exception is a known issue when using the TLS 1.3 protocol with
   specific versions of JDK, but was fixed for the following releases:

   - JDK 11.0.7
   - JDK 13.0.3
   - JDK 14.0.2

   To resolve this error, update your JDK to one of the preceding patch
   versions or a newer.
