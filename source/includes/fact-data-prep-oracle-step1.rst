The following code creates a new Oracle service account 
for Relational Migrator to connect to the Oracle 
instance. Alternatively, you can use an existing Oracle 
service account to connect to Relational Migrator with 
the appropriate permissions.

.. tip::

   To migrate data from a multi-tenant container database, `create tablespaces
   and a Common User <https://oracle-base.com/articles/12c/multitenant-manage-users-and-privileges-for-cdb-and-pdb-12cr1>`__.

a. Create a service account:

   .. code-block:: sql
      :copyable: true

      CREATE USER '<user>'@'localhost' IDENTIFIED BY '<password>';

#. Confirm that the service account owns the tables in the migration job.

   Required permissions depend on whether the service account owns the tables
   used in the migration job. To check table ownership, run the following query:

   .. code-block:: sql
      :copyable: true

      SELECT TABLE_NAME, OWNER 
      FROM ALL_TABLES 
      WHERE TABLE_NAME ='<table_name>'
      ORDER BY OWNER, TABLE_NAME;

#. Grant permissions to the service account.

   .. important::
      
      If you're migrating a multi-tenant container database as a
      common user, append ``CONTAINER=ALL`` when granting permissions. For
      example:

      .. code-block:: sql
         :copyable: false
      
         GRANT CREATE SESSION TO <user> CONTAINER=ALL;
   
   If the service account *is* the table owner:

   .. code-block:: sql
      :copyable: true

      GRANT CREATE SESSION TO <user>;
      GRANT SELECT ON V_$DATABASE TO <user>;

   If the service account *is not* the table owner:

   .. code-block:: sql
      :copyable: true

      GRANT CREATE SESSION TO <user>;
      GRANT SELECT_CATALOG_ROLE TO <user>;
      GRANT SELECT ANY TABLE TO <user>;
      GRANT SELECT ON V_$DATABASE TO <user>;
      GRANT FLASHBACK ANY TABLE TO <user>;