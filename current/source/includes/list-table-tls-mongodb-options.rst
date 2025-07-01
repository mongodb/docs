.. list-table::
   :widths: 20 10 10 50 10
   :stub-columns: 1
   :header-rows: 1

   * - Field
     - Data Type
     - Necessity
     - Action
     - Default

   * - Client Certificate Mode
     - String
     - Required
     - Select one of the following options from the menu:

       .. list-table::
          :widths: 20 80
          :stub-columns: 1
          :header-rows: 1

          * - Value
            - Reason

          * - Required
            - Your MongoDB deployments accept client certificates
              (:setting:`net.ssl.CAFile`).

          * - Optional
            - Your MongoDB deployments do not require client
              certificates or do not require client certificates
              (:setting:`net.ssl.allowConnectionsWithoutCertificates`).

     - Optional

   * - CA File Path
     - String
     - Required
     - Type the absolute path on disk to the file that contains the
       trusted |certauth| certificates in |pem| format. These
       certificates verify the server certificate returned from any
       MongoDB deployments running with |tls|.

       Two boxes are provided: one each for the :guilabel:`Linux` and :guilabel:`Windows` file paths.

     - None

   * - {+mdbagent+} PEM Key Path
     - String
     - Required
     - Type the absolute path on disk to the private key, client
       certificate, and optional intermediate certificates in |pem|
       format. The {+mdbagent+} uses the client certificate when
       connecting to any configured MongoDB that is running with the
       :setting:`net.ssl.CAFile` option.

       Two boxes are provided: one each for the :guilabel:`Linux` and :guilabel:`Windows` file paths.

     - None

   * - {+mdbagent+} PEM Key Password
     - String
     - Conditional
     - Type the password to decrypt the file provided in the
       :guilabel:`{+mdbagent+} PEM Key Path`, if that file was encrypted.
     - None
