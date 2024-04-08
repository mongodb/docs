The following code creates a new Oracle service account 
for Relational Migrator to connect to the Oracle 
instance. Alternatively, you can use an existing Oracle 
service account to connect to Relational Migrator with 
the appropriate permissions.

a. Create a service account:

   .. code-block:: sql
      :copyable: true

      CREATE USER '<user>'@'localhost' IDENTIFIED BY '<password>';

#. Grant select permissions to the service account:

   The required permission for the service account depend on whether 
   the tables are owned by the service account used to run the sync job.
   To check table ownership run the following query:

   .. code-block:: sql
      :copyable: true

      SELECT TABLE_NAME, OWNER 
      FROM ALL_TABLES 
      WHERE TABLE_NAME ='<table_name>'
      ORDER BY OWNER, TABLE_NAME;

   If the service account *is* the table owner:

   .. code-block:: sql
      :copyable: true

      GRANT CREATE SESSION TO <user>;
      GRANT SELECT ON V$DATABASE TO <user>;

   If the service account *is not* the table owner:

   .. code-block:: sql
      :copyable: true

      GRANT CREATE SESSION TO <user>;
      GRANT SELECT_CATALOG_ROLE TO <user>;
      GRANT SELECT ANY TABLE TO <user>;
      GRANT SELECT ON V$DATABASE TO <user>;
      GRANT FLASHBACK ANY TABLE TO <user>;