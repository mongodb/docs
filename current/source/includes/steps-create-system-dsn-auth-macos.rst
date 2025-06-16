a. Launch ODBC Manager.
  
   .. note::

      ODBC Manager is included with the |odbc-driver-name|.

   .. include:: /includes/temp-warn-odbc-catalina.rst

#. Click :guilabel:`System DSN`, then click :guilabel:`Add`.

   .. figure:: /images/bi-connector/odbc-manager.png
     :alt: ODBC Manager DSN configuration
     :align: center

#. Select a |odbc-driver-name| from the list of available drivers.

   Select either the :guilabel:`MongoDB ANSI ODBC` driver or the
   :guilabel:`MongoDB Unicode ODBC` driver, then click :guilabel:`OK`.

   .. include:: /includes/fact-ansi-unicode-driver.rst

#. Enter a :guilabel:`Data Source Name (DSN)`.

   Optionally enter a :guilabel:`Description`.

   .. note::

      Do not close the setup window. Proceed to the next step.

#. Add the necessary keywords.

   .. include:: /includes/odbc-manager-keywords.rst

   Using the procedure above, add the following keywords:

   .. list-table::
      :widths: 50 50
      :header-rows: 1
  
      * - Keyword
        - Value
  
      * - **SERVER**
        - The hostname or IP address of the |bi| host.

          :gold:`IMPORTANT:` Use ``127.0.0.1`` to connect using TCP to
          localhost. If you specify a value other than an IP address, 
          the {+bi-short+} attempts to connect using Unix socket.

      * - **PORT**
        - The :abbr:`IANA (Internet Assigned Numbers Authority)`
          `port number <https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml>`_
          for the |bi|. The default is ``3307``.

      * - **DATABASE**
        - The database to use after connecting.

          **You must use this keyword when connecting with Microsoft Excel.**

   .. include:: /includes/fact-odbc-parameters.rst

   For example, your user DSN configuration should look similar to
   the following:
  
   .. figure:: /images/bi-connector/odbc-manager-dsn-config.png
      :alt: ODBC Manager DSN configuration
      :align: center

   .. note::

      Do not close the setup window. Proceed to the next step.

#. Add the authentication keywords.

   .. include:: /includes/odbc-manager-keywords.rst

   Using the procedure above, add the following keywords:

   .. list-table::
      :widths: 50 50
      :header-rows: 1
  
      * - Keyword
        - Value
  
      * - **UID**
        - The username for the user that can access the active
          |bi| database.
  
          .. include:: /includes/auth-options.rst

          .. include:: /includes/auth-mechanisms-example.rst

      * - **PWD**
        - The password associated with the :guilabel:`UID`.

          .. include:: /includes/fact-db-pwd-special-char.rst

   .. include:: /includes/fact-odbc-parameters.rst

   For example, your user DSN configuration should look similar to
   the following:
  
   .. figure:: /images/bi-connector/odbc-manager-dsn-config-auth.png
      :alt: ODBC Manager DSN configuration
      :align: center

#. Click :guilabel:`OK` to finish creating the DSN.
