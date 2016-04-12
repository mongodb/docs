SSL is available only in `MongoDB Enterprise
<http://www.mongodb.com/products/mongodb-enterprise>`_ or a build of MongoDB
:about:`compiled with SSL support </contributors/tutorial/build-mongodb-from-source>`.
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
     - *Optional*. Enables SSL for encrypting connections. SSL is
       available only in `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise>`_ or a build
       of MongoDB :about:`compiled with SSL support
       </contributors/tutorial/build-mongodb-from-source>`.

   * - ``ssl.CAFilePath``
     - string
     - The path to the certificate used to authenticate through SSL.
