.. step:: Create a repository file for the ``libmongocrypt`` package

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

.. step:: Install the ``libmongocrypt`` package

   .. code-block:: sh

      sudo yum install -y libmongocrypt