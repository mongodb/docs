The ``tls`` object enables |tls| for encrypting connections. This
object is optional.

.. code-block:: cfg

   "tls" : {
       "CAFilePath" : <string>
   }

.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``tls``
     - object
     - Optional
     - Enables |tls| for encrypting connections. To use |tls|,
       be sure to choose a package that supports |tls|.

       All platforms that support
       :product:`MongoDB Enterprise <mongodb-enterprise>` also support
       |tls|.

   * - | ``tls``
       | ``.CAFilePath``
     - string
     - Conditional
     - Absolute file path to the certificate used to authenticate
       through |tls|. Required if ``tls.clientCertificateMode`` is set.

   * - | ``tls``
       | ``.clientCertificateMode``
     - string
     - Conditional
     - Declaration as to whether connections to |mms| require a |tls|
       certificate. Accepted values are ``OPTIONAL`` and ``REQUIRE``.
       Required if ``tls.CAFilePath`` is set.
