.. step:: Create a repository file for the ``libmongocrypt`` package

   .. code-block:: sh

      [libmongocrypt]
      name=libmongocrypt repository
      baseurl=https://libmongocrypt.s3.amazonaws.com/yum/redhat/$releasever/libmongocrypt/{+libmongocrypt-version+}/x86_64
      gpgcheck=1
      enabled=1
      gpgkey=https://pgp.mongodb.com/libmongocrypt.asc

.. step:: Install the ``libmongocrypt`` package

   .. code-block:: sh

      sudo yum install -y libmongocrypt