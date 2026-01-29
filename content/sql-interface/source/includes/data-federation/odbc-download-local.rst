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
