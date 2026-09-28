.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Amazon Linux:

      a. Create a repository file for the ``libmongocrypt`` package

         Replace ``<linux-version>`` in the URL with the following, depending on
         which version of Amazon Linux you are using:

         - Amazon Linux 2023: ``amazon/2023``
         - Amazon Linux 2: ``amazon/2013.03``
         - Amazon Linux: ``amazon/2``

         .. code-block:: sh

            [libmongocrypt]
            name=libmongocrypt repository
            baseurl=https://libmongocrypt.s3.amazonaws.com/yum/<linux-version>/libmongocrypt/{+libmongocrypt-version+}/x86_64
            gpgcheck=1
            enabled=1
            gpgkey=https://pgp.mongodb.com/libmongocrypt.asc

      #. Install the ``libmongocrypt`` package

         .. code-block:: sh

            sudo yum install -y libmongocrypt
   
   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst