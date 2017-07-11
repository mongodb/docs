The ``ssl`` object is optional and enables SSL for encrypting connections.

.. code-block:: cfg

   "ssl" : {
       "CAFilePath" : <string>
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``ssl``
     - object
     - *Optional*. Enables SSL for encrypting connections. To use SSL,
       be sure to choose a package that supports SSL.

       Starting in MongoDB 3.0, most MongoDB distributions now include
       support for SSL. 

       All `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise>`_ supported
       platforms include SSL support.

   * - ``ssl.CAFilePath``
     - string
     - The path to the certificate used to authenticate through SSL.
       
   * - ``ssl.clientCertificateMode``
     - string
     - Specifies whether connections to |mms| require an SSL certificate.
       Valid values are ``OPTIONAL`` and ``REQUIRED``.
