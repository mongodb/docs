The **ssl** object enables |tls| for encrypting connections. This
object is optional.

.. code-block:: json

   "ssl" : {
     "CAFilePath" : "<string>"
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ssl
     - object
     - Optional
     - Enables |tls| for encrypting connections. To use |tls|, choose a
       package that supports |tls|.

       All platforms that support
       :product:`MongoDB Enterprise <mongodb-enterprise>` also support
       |tls|.

   * - ssl.CAFilePath
     - string
     - Conditional
     - Absolute file path to the certificate used to authenticate
       through |tls|. Required if you set
       **ssl.clientCertificateMode**.

   * - ssl.clientCertificateMode
     - string
     - Conditional
     - Declaration as to whether connections to |mms| require a |tls|
       certificate. |mms| accepts **OPTIONAL** and **REQUIRE**.
       Required if you set **ssl.CAFilePath**.
