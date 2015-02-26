To restore collection data to a database with authentication enabled,
the connecting user must possess the appropriate user roles.

To restore a single database, the connecting user must possess the :authrole:`readWrite`
role for that database. Alternatively, the
:authrole:`readWriteAnyDatabase` provides access to restore any database.
The :authrole:`restore` role also provides the requisite permissions.
