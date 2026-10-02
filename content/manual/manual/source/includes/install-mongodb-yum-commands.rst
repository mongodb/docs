You can also install the MongoDB Shell that uses the system's OpenSSL.
You must have already installed OpenSSL on your system before
installing this version of the MongoDB Shell.

You can install all of the MongoDB Enterprise packages and the
MongoDB Shell that uses the system's OpenSSL without removing the
MongoDB Shell first. For example:

.. code-block:: sh

   sudo yum install -y mongodb-enterprise mongodb-mongosh-shared-openssl11

The following example removes the MongoDB Shell and then installs the
MongoDB Shell that uses the system's OpenSSL 1.1:

.. code-block:: sh

   sudo yum remove -y mongodb-mongosh && sudo yum install -y
   mongodb-mongosh-shared-openssl11

The following example removes the MongoDB Shell and then installs the
MongoDB Shell that uses the system's OpenSSL 3:

.. code-block:: sh

   sudo yum remove -y mongodb-mongosh && sudo yum install -y
   mongodb-mongosh-shared-openssl3

If the MongoDB Shell fails to start with the following error, install
the ``mongodb-mongosh-shared-openssl3`` package by using the preceding
commands:

.. code-block:: none
   :copyable: false

   mongosh: OpenSSL configuration error: ...:error:030000A9:digital
   envelope routines:alg_module_init:unknown
   option:../deps/openssl/openssl/crypto/evp/evp_cnf.c:61:name=rh-allow-sha1-signatures,
   value=yes

The error affects RHEL 9+ and derivatives such as Amazon Linux 2023.

You can also choose the MongoDB packages to install.
   
The following example installs MongoDB Enterprise and tools, and the
MongoDB Shell that uses the system's OpenSSL 1.1:

.. code-block:: sh

   sudo yum install -y mongodb-enterprise-database
   mongodb-enterprise-tools mongodb-mongosh-shared-openssl11

The following example installs MongoDB Enterprise and tools, and the
MongoDB Shell that uses the system's OpenSSL 3:

.. code-block:: sh

   sudo yum install -y mongodb-enterprise-database
   mongodb-enterprise-tools mongodb-mongosh-shared-openssl3
