.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Windows:

      .. procedure::

         .. include:: /includes/queryable-encryption/tutorials/steps-install-libmongocrypt-windows.rst

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst