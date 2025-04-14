You can also install the MongoDB Shell that uses the system's OpenSSL.
You must have already installed OpenSSL on your system before
installing this version of the MongoDB Shell.

You can install all of the MongoDB Enterprise packages and the
MongoDB Shell that uses the system's OpenSSL without removing the
MongoDB Shell first. For example:

.. code-block:: sh

   sudo apt-get install -y mongodb-enterprise mongodb-mongosh-shared-openssl11

The following example removes the MongoDB Shell and then installs the
MongoDB Shell that uses the system's OpenSSL 1.1:

.. code-block:: sh

   sudo apt-get remove -y mongodb-mongosh && sudo apt-get install -y
   mongodb-mongosh-shared-openssl11

The following example removes the MongoDB Shell and then installs the
MongoDB Shell that uses the system's OpenSSL 3:

.. code-block:: sh

   sudo apt-get remove -y mongodb-mongosh && sudo apt-get install -y
   mongodb-mongosh-shared-openssl3

You can also choose the MongoDB packages to install.
   
The following example installs MongoDB Enterprise and tools, and the
MongoDB Shell that uses the system's OpenSSL 1.1:

.. code-block:: sh

   sudo apt-get install -y mongodb-enterprise-database
   mongodb-enterprise-tools mongodb-mongosh-shared-openssl11

The following example installs MongoDB Enterprise and tools, and the
MongoDB Shell that uses the system's OpenSSL 3:

.. code-block:: sh

   sudo apt-get install -y mongodb-enterprise-database
   mongodb-enterprise-tools mongodb-mongosh-shared-openssl3
