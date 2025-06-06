.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Field

     - Value

   * - :guilabel:`Host`

     - The host IP or DNS name.

   * - :guilabel:`Port`

     - The port number.

   * - :guilabel:`Database`

     - The database name. Leave blank to connect to the default database.

   * - :guilabel:`Username` and :guilabel:`Password`

     - The credentials to use for authentication.
     
       Checking :guilabel:`Save password` saves the password securely on 
       your machine, so you don't have to enter the :guilabel:`Username` and
       :guilabel:`Password` again when using the saved connection.

   * - :guilabel:`General / SSL` toggle

     - View SSL settings for the connection. 
     
       To use SSL, you must first uncomment and update the ``server.ssl``
       configuration properties in your ``user.properties`` :ref:`file <file-location>`.
     
   * - SSL: :guilabel:`Use SSL`
   
     - Enable or disable SSL.
       
   * - SSL: :guilabel:`SSL mode`
   
     - With SSL enabled, choose from:

       - :guilabel:`Prefer` (default): Make an encrypted connection if 
         possible, otherwise fall back to an unencrypted connection.
       
       - :guilabel:`Require`: Require an encrypted connection.

       - :guilabel:`Verify CA`: Verify the server certificate against a trusted
         Certificate Authority.

       - :guilabel:`Verify full`: Verify the database connection
         information against the certificate contents.