.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

      To use prefix, suffix, or substring queries, install version
      |driver-version-text|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Windows:

      a. Download libmongocrypt

         Click `here <https://github.com/mongodb/libmongocrypt/releases/latest>`__
         to see the latest ``libmongocrypt`` release.

      #. Use ``gpg`` to verify the signature

         The public key for ``libmongocrypt`` is available at `https://pgp.mongodb.com <https://pgp.mongodb.com/>`__

      To use prefix, suffix, or substring queries, install
      ``libmongocrypt`` version 1.20.0 or later.

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst