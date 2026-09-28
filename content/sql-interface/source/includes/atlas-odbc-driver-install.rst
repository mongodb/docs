The MongoDB |odbc| driver is required for connecting to your database with Power BI, Excel,
or other ODBC-supported |bi| tools.

ODBC Driver Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~

- The MongoDB |odbc| driver is compatible with:

  - Windows
  - Linux glibc 2.34+ (x86_64 and arm64)

- You can authenticate with :manual:`SCRAM-SHA-1, SCRAM-SHA-256
  </core/security-scram/>`, :ref:`X.509 <security-auth-x509>`, and,
  where applicable, :ref:`MongoDB Passwordless Authentication with AWS
  <set-up-pwdless-auth>`.

Prerequisites
~~~~~~~~~~~~~

.. tabs::

   .. tab:: Windows
      :tabid: windows

      .. include:: /includes/fact-shared-prereqs-odbc-driver.rst

   .. tab:: Linux
      :tabid: linux

      - glibc 2.34 or later.

      - The `unixODBC <https://www.unixodbc.org/>`__ package:

        .. code-block:: sh

           sudo apt install unixodbc

      - The `odbcinst <https://packages.debian.org/unstable/odbcinst>`__ package:

        .. code-block:: sh

           sudo apt install odbcinst

Procedure
~~~~~~~~~

.. tabs::
   :hidden: true

   .. tab:: Windows
      :tabid: windows

      .. procedure::
         :style: normal

         .. step:: Download the MongoDB ODBC driver.

            Download the latest |odbc| driver from the `MongoDB download center <https://www.mongodb.com/try/download/odbc-driver/>`__.

         .. step:: Verify the integrity of the downloaded package.

            The MongoDB release team digitally signs all software packages to
            certify that a particular MongoDB package is a valid and unaltered
            MongoDB release. Complete the following steps to verify the ODBC driver
            binary against its SHA256 key:

            a. On the `MongoDB download center
               <https://www.mongodb.com/try/download/odbc-driver/>`__, click
               :guilabel:`Copy link` for the Windows installer. Append
               ``.sha256`` to the copied URL and download the result.
               MongoDB publishes the checksum file alongside each
               installer, so this URL is correct for every release.

            #. Compare the checksum file to the MongoDB installer hash
               using the following PowerShell script. Replace
               ``<installer>`` with the name of the installer you
               downloaded, without the ``.msi`` extension:

               .. code-block:: shell

                  $sigHash = (Get-Content $Env:HomePath\Downloads\<installer>.msi.sha256 | Out-String).SubString(0,64).ToUpper(); `
                  $fileHash = (Get-FileHash $Env:HomePath\Downloads\<installer>.msi).Hash.Trim(); `
                  echo $sigHash; echo $fileHash; `
                  $sigHash -eq $fileHash

               The command outputs three lines:

               - A SHA256 hash that you downloaded directly from MongoDB.
               - A SHA256 hash computed from the MongoDB ODBC driver binary you downloaded from MongoDB.
               - A True or False result depending if the hashes match.

               If the hashes match, the MongoDB binary is verified.

         .. step:: Install the ODBC driver.

            a. Run the installation file that you downloaded to open the :guilabel:`Atlas SQL ODBC Setup Wizard`. 

            #. Follow the steps in the Setup Wizard.

         .. step:: Configure a System DSN.

            .. note::

               You don't need to configure a DSN to connect from
               Power BI Desktop with the Power BI Connector for
               MongoDB, in either Import Mode or Direct Query. To
               learn more, see :ref:`Connect Power BI
               <connect-powerbi>`.

            To configure your |odbc| connection:

            a. Open your ODBC Data Source Administrator.

               .. note::

                  If you use a 64-bit processor, be sure to open the 64-bit
                  ODBC Data Source Administrator.

            #. Navigate to the **System DSN** tab.

            #. Add a new **System DSN**.

            #. When prompted to select a driver for your data source,
               select the :guilabel:`MongoDB Atlas SQL ODBC Driver`.

            #. Enter your connection information. You must enter:

               .. include:: /includes/fact-connection-info-atlas-sql.rst

               .. list-table::
                  :widths: 20 80
                  :header-rows: 1

                  * - Field
                    - Description

                  * - DSN
                    - A name for your new DSN.

                  * - Username
                    - A database username to use to connect to your database.

                  * - Password
                    - The database user's password.

                  * - MongoDB URI
                    - Your MongoDB deployment URI.

                  * - Database
                    - The name of the database to which to connect.

                  * - Enable maximum
                    - Checkbox to enforce maximum string length of 4000
                      characters. You must enable this option to work with |bi|
                      tools like Microsoft SQL Server Management Studio that
                      can't support variable length string data with unknown
                      maximum length. 

            #. Once you enter the required connection information, 
               you can test your connection with 
               your ODBC Data Source Administrator.

         .. step:: Configure logging for the ODBC driver.

            Enable SQL trace logging within the |odbc| driver either by setting it
            in the connection string or by adding a key value pair to the Windows 
            System registry. You can configure the |odbc| driver log level by
            adding a key-value pair to the Windows System registry, either
            directly or by using a ``.ini`` file. To learn more, see the `Windows
            documentation on configuring the system registry
            <https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry>`__.

            If you set in both the driver and the connection
            string, the connection string setting takes precedence. You can
            specify the desired log level. Logs are hierarchical, which means
            {+asql+} logs all messages at or above the level you set. You can
            configure one of the following log levels:  

            - ``error`` - to log only error messages 
            - ``warn`` - to log all warnings 
            - ``info`` - to log messages of info, errors, and warnings :icon-fa5:`cog`
            - ``debug`` - to log all messages of error and info :icon-fa5:`star`
            - ``trace`` - to log all trace messages
            - ``off`` - to disable logging

            :icon-fa5:`cog` ``info`` excludes debug and trace messages.
            :icon-fa5:`star` ``debug`` messages don't appear in the logs.

            The default log level is ``info``. You can change the log level by
            appending the key ``loglevel`` and value to your ODBC connection string. 

            .. example:: 

               The following changes the log level to ``debug``:  

               .. code-block:: 

                  loglevel=debug

               The following changes the log level to ``error``: 

               .. code-block:: 

                  loglevel=error

            By default, {+asql+} writes logs to a file named ``mongo_odbc.log``
            that it creates in the ``logs`` folder. {+asql+} writes logs to the
            file in the following path:

            .. code-block:: 

               C:\Users<user>\Documents\MongoDB\Atlas SQL ODBC<version>\logs\mongo_odbc.log

            {+asql+} automatically rotates the logs when the file size reaches
            ``.5MB``. The log files are named ``mongo_odbc.log.x`` where the ``x``
            denotes the number of rotation. {+asql+} only keeps up to 10 log
            files. When there are 10 log files, {+asql+} automatically rotates and
            shuffles such that ``mongo_odbc.log.1`` becomes ``mongo_odbc.log.2``
            and so on. 


   .. tab:: Linux
      :tabid: linux

      .. procedure::
         :style: normal

         .. step:: Download the MongoDB ODBC driver.

            Download the latest |odbc| driver from the `MongoDB download center <https://www.mongodb.com/try/download/odbc-driver/>`__.

            .. note::

               Click :guilabel:`Copy link` to copy the download URL. You
               need this URL for the command below, and again to construct
               the signature file link in a later step.

            Replace ``<download-link>`` with the URL you copied:

            .. code-block:: sh

               curl <download-link> --output mongoodbc.tar.gz

         .. step:: Verify the integrity of the downloaded package.

            The MongoDB release team digitally signs all software packages to
            certify that a particular MongoDB package is a valid and unaltered
            MongoDB release. The ``atlas-sql-odbc.asc`` key is available on 
            `pgp.mongodb.com <https://pgp.mongodb.com/atlas-sql-odbc.asc>`__  

            a. Append ``.sig`` to the download link you copied, then run
               the following command to download the signature file.

               .. code-block:: sh 

                  curl <download-link>.sig --output mongoodbc.tar.gz.sig

            #. Run the following command to download then import the key file. 

               .. io-code-block::
                  :copyable: true 

                  .. input:: 
                     :language: shell 

                     curl -LO https://pgp.mongodb.com/atlas-sql-odbc.asc
                     gpg --import atlas-sql-odbc.asc

                  .. output:: 
                     :language: shell 

                     gpg: key 1CCF1A1263CDD699: public key "Atlas SQL ODBC Release Signing Key <packaging@mongodb.com>" imported
                     gpg: Total number processed: 1
                     gpg:               imported: 1

            #. Run the following command to verify the MongoDB installation file.

               .. code-block:: 

                  gpg --verify mongoodbc.tar.gz.sig mongoodbc.tar.gz

               GPG should return this response:

               .. code-block:: shell

                  gpg: Signature made Wed May 22 13:24:36 2024 MDT
                  gpg:                using RSA key 0C5F007ABC491E4A
                  gpg: Good signature from "Atlas SQL ODBC Release Signing Key <packaging@mongodb.com>" [unknown]

               If the package is properly signed, but you do not currently trust
               the signing key in your local ``trustdb``, ``gpg`` will also return
               the following message: 

               .. code-block:: shell 

                  gpg: WARNING: This key is not certified with a trusted signature!
                  gpg:          There is no indication that the signature belongs to the owner.
                  Primary key fingerprint: 1CF5 B0D7 B2F8 9E16 52D8 BA79 0C5F 007A BC49 1E4A

               If you receive the following error message, confirm that you
               imported the correct public key: 

               .. code-block:: shell 

                  gpg: Can't check signature: public key not found

         .. step:: Extract the ODBC driver.

            The following example extracts the archive contents to 
            ``/usr/local/lib/mongoodbc``. The ``mongoodbc`` directory 
            contains a ``LICENSE`` file, a ``README.MD`` file, and a 
            ``bin`` directory. The ``bin`` directory contains the 
            ``libatsql.so`` ODBC driver library.

            .. code-block:: sh

               sudo tar -zxf mongoodbc.tar.gz --directory /usr/local/lib

         .. step:: Locate the ODBC driver configuration files.

            a. Run the following command:

               .. code-block:: sh

                  odbcinst -j

            #. Note the locations of the configuration files for the 
               ``DRIVERS``, ``SYSTEM DATA SOURCES``, and 
               ``USER DATA SOURCES``.

               .. code-block:: sh

                  unixODBC 2.3.9
                  DRIVERS............: /etc/odbcinst.ini
                  SYSTEM DATA SOURCES: /etc/odbc.ini
                  FILE DATA SOURCES..: /etc/ODBCDataSources
                  USER DATA SOURCES..: /home/ubuntu/.odbc.ini
                  SQLULEN Size.......: 8
                  SQLLEN Size........: 8
                  SQLSETPOSIROW Size.: 8

         .. step:: Configure the ODBC driver.

            a. Open the ``odbcinst.ini`` file in your preferred 
               editor.

               .. code-block:: sh

                  sudo vim /etc/odbcinst.ini

            #. Add the following entries to the file and specify the 
               path to the ``libatsql.so``  |odbc| driver library.

               .. code-block:: sh

                  [ODBC Drivers]
                  MongoDB Atlas SQL ODBC Driver = Installed

                  [MongoDB Atlas SQL ODBC Driver]
                  Driver=/usr/local/lib/mongoodbc/bin/libatsql.so

         .. step:: Configure the System DSN or User DSN.

            If multiple users share the DSN, configure the System DSN.
            If multiple users user shouldn't share the DSN, configure
            the User DSN. If a single user uses the DSN, you can
            configure the System DSN or User DSN.

            .. note::

               You don't need to configure a DSN to connect from
               Power BI Desktop with the Power BI Connector for
               MongoDB, in either Import Mode or Direct Query. To
               learn more, see :ref:`Connect Power BI
               <connect-powerbi>`.

            a. Open the ``SYSTEM DATA SOURCES`` file or
               ``USER DATA SOURCES`` file in your preferred 
               editor.

               **System DSN Example:**

               .. code-block:: sh

                  sudo vim /etc/odbc.ini

               **User DSN Example:**

               .. code-block:: sh

                  sudo vim /home/ubuntu/.odbc.ini

            #. Add the following entries to the file and specify the 
               appropriate values.

               .. include:: /includes/fact-system-user-odbc-config.rst

         .. step:: Test your connection.

            Run the following command:

            .. code-block:: sh

               iusql -v MongoDB_Atlas_SQL

            The following example shows a successful connection:

            .. code-block:: sh

               +---------------------------------------+
               | Connected!                            |
               |                                       |
               | sql-statement                         |
               | help [tablename]                      |
               | quit                                  |
               |                                       |
               +---------------------------------------+

            If the connection fails, verify the details in your 
            configuration files against your {+fdi+},
            {+dedicated-cluster+}, or self-managed {+ea+} deployment.

            .. note::

               The following warning doesn't impact the |odbc| driver 
               operation:

               .. code-block:: sh

                  [MongoDB][API] Buffer size "0" not large enough for data.

               The |odbc| driver doesn't support the ``iusql`` query 
               function.
