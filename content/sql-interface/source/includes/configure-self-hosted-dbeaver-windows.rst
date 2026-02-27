Set Up On-Premise {+sql-interface+} for DBeaver on Windows
----------------------------------------------------------

.. procedure::
   :style: normal

   .. include:: /includes/schema-builder-windows.rst

   .. step:: Download and Install Your SQL Driver

      Download and install the JDBC MongoDB SQL driver.

      .. list-table::
         :header-rows: 1
         :widths: 20 40 40

         * - Driver Type
           - Compatible Operating Systems
           - Installation Instructions

         * - **JDBC Driver**
           - Windows x86_64
           - :ref:`JDBC Installation Guide <sql-connect-jdbc>`

   .. step:: DBeaver Community

      a. Launch DBeaver.

      b. Add a new driver.

         i. In DBeaver, click :guilabel:`Database` and select
            :guilabel:`Driver Manager` from the dropdown menu.
         ii. Click :guilabel:`New` to open the
             :guilabel:`Create new driver` modal.
         iii. In the :guilabel:`Settings` tab, enter the following
              information:

              .. list-table::
                 :stub-columns: 1
                 :widths: 10 20

                 * - Driver Name
                   - ``MongoDB``

                 * - Class Name
                   - ``com.mongodb.jdbc.MongoDriver``

         iv. In the :guilabel:`Libraries` tab, click
             :guilabel:`Add File` and add your JDBC driver
             ``all.jar`` file.

             Click :guilabel:`Find Class`.

         v. Click :guilabel:`OK`. The
            :guilabel:`Create new driver` modal closes.

      c. Create a database connection.

         i. In DBeaver, click :guilabel:`Database` and select
            :guilabel:`New Database Connection` from the dropdown
            menu to open the :guilabel:`Connect to a database` modal.

         ii. From the list of databases, select the ``MongoDB``
             database driver that you created in the previous step.

             If you don't see ``MongoDB``, select
             the :guilabel:`All` category inside the modal.

             Click :guilabel:`Next`.

         iii. In the :guilabel:`Main` tab, enter the following
              information:

              .. list-table::
                 :stub-columns: 1
                 :widths: 10 20

                 * - JDBC URL
                   - Your connection string from step 5.

                 * - Username
                   - The MongoDB user to connect with.

                 * - Password
                   - The MongoDB user's password.

         iv. In the :guilabel:`Driver properties` tab, expand
             :guilabel:`User Properties`. Add the following key-value
             properties:

             .. list-table::
                :stub-columns: 1
                :widths: 10 20

                * - database
                  - The name of your virtual database.

                * - user
                  - The MongoDB user to connect with. Not required if
                    you entered a ``Username`` in the previous step.

                * - password
                  - The MongoDB user's password. Not required if you
                    entered a ``Password`` in the previous step.

      d. Click :guilabel:`Finish`.
