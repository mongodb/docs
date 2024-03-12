.. step:: (Optional) Set up user permissions

   The following code creates a new MySQL service account 
   for Relational Migrator to connect to the MySQL 
   instance. Alternatively, you can use an existing MySQL service 
   account to connect to Relational Migrator with the appropriate 
   permissions.

   a. Create a service account:

      .. code-block:: sql
         :copyable: true

         CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

   #. Grant the required permissions to the service account:

      .. code-block:: sql
         :copyable: true
         
         GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT 
         ON *.* 
         TO 'user'@'%';

   #. Apply the user privilege changes:

      .. code-block:: sql
         :copyable: true

         FLUSH PRIVILEGES; 