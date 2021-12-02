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

   * - ssl.clientCertificateMode
     - string
     - Conditional
     - Indicates whether connections to |mms| require a |tls|
       certificate. The values are **OPTIONAL** and **REQUIRE**.

   * - ssl.CAFilePath
     - string
     - Conditional
     - Absolute file path to the certificate used to authenticate
       through |tls| on a Linux or UNIX host. 
       
       |mms| requires either **ssl.CAFilePath** or **ssa.CAFilePathWindows** if:
       
       - You're using |tls| or X.509 authentication, and
       - The CA file is not in your operating system's root certificates.

   * - ssl.CAFilePathWindows
     - string
     - Conditional
     - Absolute file path to the certificate used to authenticate
       through |tls| on a Windows host.
              
       |mms| requires either **ssl.CAFilePath** or **ssa.CAFilePathWindows** if:
       
       - You're using |tls| or X.509 authentication, and
       - The CA file is not in your operating system's root certificates.

   * - ssl.autoPEMKeyFilePath
     - string
     - Conditional
     - Absolute file path to the client private key (PEM) file that
       authenticates the |tls| connection on a Linux or UNIX
       host. 
         
       |mms| requires either **ssl.autoPEMKeyFilePath** or **ssa.autoPEMKeyFilePathWindows**
       if you're using |tls| or X.509 authentication.

   * - ssl.autoPEMKeyFilePathWindows
     - string
     - Conditional
     - Absolute file path to the client private key (PEM) file that
       authenticates the |tls| connection on a Windows host.

       |mms| requires either **ssl.autoPEMKeyFilePath** or **ssa.autoPEMKeyFilePathWindows**
       if you're using |tls| or X.509 authentication.

   * - ssl.autoPEMKeyFilePwd
     - string
     - Conditional
     - Password for the private key (PEM) file specified in
       **ssl.autoPEMKeyFilePath** or **ssa.autoPEMKeyFilePathWindows**. |mms|
       requires this password if the PEM file is encrypted.
      