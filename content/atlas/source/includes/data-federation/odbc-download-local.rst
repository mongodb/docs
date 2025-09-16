====================
System Requirements
====================

Hardware Requirements
-------------------------

The MongoDB |odbc| driver has no hard system requirements. Any system capable of
running a modern SQL tool (such as Power BI or DBeaver) is capable of running the MongoDB ODBC driver.

Software Requirements
-------------------------

The MongoDB ODBC driver is compatible with:

- Windows x86_64 architecture
- linux x86_64
- linux arm64 systems

================
Installation
================

.. tabs::

   .. tab:: Windows
      :tabid: windows

      Prerequisites
      ------------------
      
      `Microsoft Visual C++ (MSVC) Redistributable 17.0 or higher
      <https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170>`__
      is required for the proper MSVC runtime libraries to be present.

      Installation Procedure
      ----------------------
      
      Perform the following steps to install the ODBC driver on a Windows system: 
      
      .. procedure::
            :style: normal
    
            .. step:: Download the ODBC driver from the
                `MongoDB Download Center <https://www.mongodb.com/try/download/odbc-driver>`__.
    
                .. note::
                   
                   The MongoDB ODBC Driver is available for Windows and Ubuntu. Ensure you
                   select the :guilabel:`Windows` option in the :guilabel:`Platform` 
                   dropdown menu.
    
            .. step:: Double-click the downloaded file to run the installer. Follow the steps in the
                      Setup Wizard to complete the installation.
             
      Post-Installation Verification and DSN Setup
      ---------------------------------------------

      .. procedure::
         :style: normal

         .. step:: Open your ODBC Data Source Administrator.

         .. step:: Navigate to the :guilabel:`System DSN` tab.

         .. step:: Add a new System DSN (or User DSN for non-shared DSNs).

         .. step:: When prompted to select a driver for your data source, select the
            :guilabel:`MongoDB Atlas SQL ODBC Driver`.

         .. step:: Enter your connection information.

                   At a minimum, you must enter the following information:
                
                   -  **Data Source Name (DSN):**  A name for your new DSN.
                   -  **Username:**  A database username to connect to your database.
                   -  **Password:**  The database user's password.
                   -  **MongoDB URI:**  Your MongoDB deployment |uri|.
                   -  **Database:**  The name of the database to which to connect.
                   -  **Enable maximum:**  Checkbox to enforce maximum string length of
                      4000 characters. You must enable this option to work with BI tools
                      like Microsoft SQL Sever Management Studio that can't support
                      variable length string data with unknown maximum length.

         .. step:: Once you enter the required connection information, click the :guilabel:`Test` 
            button to test your connection.

            

   .. tab:: Linux
      :tabid: linux

      Installation Procedure
      ----------------------

      Perform the following steps to install the ODBC driver on a Linux system:
      
      .. procedure::
         :style: normal

         .. step:: Install ``unixodbc``.

            .. code-block:: sh

               sudo apt install unixodbc

         .. step:: Extract the ODBC driver and translation library.

            .. code-block:: sh

               sudo tar -zxf mongoodbc.tar.gz --directory /usr/local/lib

         .. step:: Install and configure the ODBC driver.

            #. Locate the ODBC driver configuration files. Note the locations of the configuration
               files for ``DRIVERS``, ``SYSTEM DATA SOURCES``, and ``USER DATA SOURCES``. Run the following
               command:

               .. code-block:: sh

                  odbcinst -j

               **Example output:**

               .. code-block:: sh

                  unixODBC 2.3.9 
                  DRIVERS............: /etc/odbcinst.ini 
                  SYSTEM DATA SOURCES: /etc/odbc.ini 
                  FILE DATA SOURCES..: /etc/ODBCDataSources 
                  USER DATA SOURCES..: /home/ubuntu/.odbc.ini 
                  SQLULEN Size.......: 8 
                  SQLLEN Size........: 8
                  SQLSETPOSIROW Size.: 8

            #. Configure the ODBC driver.

               - Open the odbcinst.ini file in your preferred editor.

                 .. code-block:: sh

                    sudo vim /etc/odbcinst.ini

               - Add the following entries to the file and specify the path to the ``libatsql.so`` ODBC
                 driver library.

                 .. code-block:: ini

                    [ODBC Drivers] MongoDB Atlas SQL ODBC Driver = Installed

                    [MongoDB Atlas SQL ODBC Driver] Driver=/usr/local/lib/mongoodbc/bin/libatsql.so

      
      Linux Verification
      ------------------

      By default, system DSNs are added to the ``/etc/obdbc.ini``, while User DSNs are
      added to ``/home/<user>/.odbc.ini``. Your choice of DSN depends on your use case. If
      multiple users share a DSN, use a System DSN, otherwise use a User DSN.

      The following steps set up a System DSN.

      .. procedure::
         :style: normal

         .. step:: Open your odbc.ini file in your preferred editor.

            .. code-block:: sh

               sudo vim /etc/odbc.ini

         .. step:: Enter your connection and driver information.

            -  **Driver:**  Path to the ``libatsql.so`` ODBC driver library.
            -  **User:**  A database username to use to connect to your database.
            -  **Password:**  The database user’s password.
            -  **URI:**  Your MongoDB deployment |uri|.
            -  **Database:**  The name of the database to which to connect.
            -  **UnicodeTranslationOption:**  Unicode encoding for MongoSQL. Set to utf16.
            -  **Enable maximum:**  A flag to enforce maximum string length of 4000 characters. 
               
               .. important:: 
               
                  You must enable this option to work with BI tools like Microsoft SQL Server
                  Management Studio that can’t support variable length string data with
                  unknown maximum length. To enable, set the value to ``1``. To disable, set the
                  value to ``0``.

            **Example:**

            .. code-block:: ini

               [ODBC Data Sources] MongoDB_Atlas_SQL = "MongoDB Atlas SQL ODBC Driver"
               
               [MongoDB_Atlas_SQL] Password = your_password 
               Driver = /usr/local/lib/mongoodbc/bin/libatsql.so 
               Database = sample_mflix 
               User =  your_username 
               Uri = mongodb://your.uri.domain/?options 
               UnicodeTranslationOption = utf16

         .. step:: Test your connection.

            Run the following command:

            .. code-block:: sh

                  iusql -v MongoDB_Atlas_SQL

            .. note::
               Specify the DSN name you chose in the previous example.

               A successful connection shows the following:

            .. code-block:: sh

                +---------------------------------------+
                | Connected!                            |
                |                                       |
                | sql-statement                         |
                | help [tablename]                      |
                | quit                                  |
                |                                       |
                +---------------------------------------+

            .. note::
               
               The warning ``[MongoDB][API] Buffer size "0" not large enough for data`` does not impact driver operation and is not a sign of a faulty installation.

.. tip:: 
   
   For additional information on the ODBC driver, see the `MongoDB ODBC Driver Read Me file <https://translators-connectors-releases.s3.amazonaws.com/eap/mongodb-odbc-driver/docs/MongoDB_ODBC_Guide.pdf>`__.