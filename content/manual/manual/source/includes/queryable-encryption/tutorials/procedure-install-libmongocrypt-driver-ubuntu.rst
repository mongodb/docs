.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Ubuntu:

      .. procedure::

         .. include:: /includes/queryable-encryption/tutorials/steps-install-libmongocrypt-ubuntu.rst

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      Start an :atlas:`Atlas Cluster </getting-started>` or a :ref:`MongoDB
      Enterprise instance <manage-mongodb-processes>`.