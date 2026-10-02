.. note::

   If the MongoDB Shell fails to start with the following error on
   RHEL 9+ and derivatives such as Amazon Linux 2023, install the
   ``mongodb-mongosh-shared-openssl3`` package:

   .. code-block:: none
      :copyable: false

      mongosh: OpenSSL configuration error: ...:error:030000A9:digital
      envelope routines:alg_module_init:unknown
      option:../deps/openssl/openssl/crypto/evp/evp_cnf.c:61:name=rh-allow-sha1-signatures,
      value=yes