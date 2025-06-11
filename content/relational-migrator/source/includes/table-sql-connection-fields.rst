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

     - The database name. If blank, you only see objects in the default
       ``dbo`` schema in all databases.

   * - :guilabel:`Authentication`

     - By default, this is set to :guilabel:`SQL Server`. Set to
       :guilabel:`Windows` to enable :ref:`Windows Integrated Authentication
       <rm-sql-connection-string>`, using the credentials of the user who
       launched the {+rel-mig+} executable. This disables the
       :guilabel:`Username` and :guilabel:`Password` fields.

   * - :guilabel:`Username` and :guilabel:`Password`

     - The credentials to use for authentication. Disabled if
       :guilabel:`Authentication` is set to :guilabel:`Windows`.
     
       Checking :guilabel:`Save password` saves the password securely on 
       your machine, so you don't have to enter the :guilabel:`Username` and
       :guilabel:`Password` again when using the saved connection.

   * - :guilabel:`General / SSL` toggle

     - View SSL settings for the connection. 
     
       To use SSL, you must first uncomment and update the ``server.ssl``
       configuration properties in your ``user.properties`` :ref:`file <file-location>`.
     
   * - SSL: :guilabel:`Use SSL`
   
     - Enable or disable SSL.
       
   * - SSL: :guilabel:`Trust server certificate`
   
     - With SSL enabled, check this to trust the stored certificate. Leave
       unchecked to verify the server certificate against a trusted
       Certificate Authority.
