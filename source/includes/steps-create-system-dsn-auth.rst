a. Start the Microsoft ODBC Data Sources program.
   
   Choose the program version (64-bit or 32-bit) which is
   appropriate for your system and ODBC driver version.

#. Select the ``System DSN`` tab. 

#. Click the ``Add`` button. 

   .. figure:: /images/bi-connector/windows-odbc-administrator.png
      :alt: Screenshot of the Windows ODBC Administrator application
      :figwidth: 550px

#. Select a |odbc-driver-name| from the list of available drivers.
   
   Select either the :guilabel:`MongoDB ODBC ANSI Driver` or the
   :guilabel:`MongoDB ODBC Unicode Driver`, then click
   :guilabel:`OK`.

   .. include:: /includes/fact-ansi-unicode-driver.rst

#. Fill in the necessary form fields. 
   
   Click the :guilabel:`Details` button to expose the lower half of the form.

   The following form fields are required:

   .. list-table::
      :header-rows: 1
      :widths: 30 70

      * - Field Name
        - Description

      * - :guilabel:`Data Source Name`
        - A name of your choice.

      * - :guilabel:`TCP/IP Server`
        - Address of the server where your
          :binary:`~bin.mongosqld` process is running. If you have enabled
          |bi-short| on `MongoDB Atlas
          <https://www.mongodb.com/cloud/atlas>`_, you can find the
          hostname of the server where :binary:`~bin.mongosqld` is running
          in the `connection information
          <https://docs.atlas.mongodb.com/connect-to-cluster/#connect-to-your-cluster>`_
          for your cluster.

      * - :guilabel:`Port`
        - Port number of your :binary:`~bin.mongosqld`
          process.

      * - :guilabel:`Database`
        - The name of the database to connect to, e.g. ``test``.

#. Provide connection information.

   The following fields are required when running with
   :option:`--auth <mongosqld --auth>` enabled or when connecting to an
   {+bi-atlas-short+} instance.
   
   .. list-table::
      :header-rows: 1
      :widths: 30 70

      * - Field Name
        - Description

      * - :guilabel:`User`
        - Username of the :manual:`MongoDB user </core/security-users/>`
          who is authenticated to use your target database.

          .. include:: /includes/auth-options.rst

          .. include:: /includes/auth-mechanisms-example.rst

      * - :guilabel:`Password`
        - The authenticated user's password.

          .. include:: /includes/fact-db-pwd-special-char.rst

      * - :guilabel:`Authentication`
        - The default authentication method. When using the
          {+odbc-driver+}, this field is not required.

          To use the :doc:`authentication plugin
          </reference/auth-plugin-c>` in conjunction with
          another ODBC driver, fill in this field with the
          string ``mongosql_auth``.

#. Click the ``Test`` button to test the ODBC connection.
   
   If the connection is successful, click :guilabel:`OK` to add the
   :abbr:`DSN (Data Source Name)`. If the connection fails,
   check to make sure your MongoDB user is correctly authenticated for
   the database named in the connection.
