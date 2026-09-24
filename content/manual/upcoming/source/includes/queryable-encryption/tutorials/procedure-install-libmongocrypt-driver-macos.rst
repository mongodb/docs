.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

      To use prefix, suffix, or substring queries, install version
      |driver-version-text|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on macOS:

      a. Install ``libmongocrypt`` using Homebrew

         .. code-block:: sh

            brew install mongodb/brew/libmongocrypt

      To use prefix, suffix, or substring queries, install
      ``libmongocrypt`` version 1.20.0 or later.

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst