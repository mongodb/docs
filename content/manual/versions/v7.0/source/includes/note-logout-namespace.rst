.. note::

   If you're not logged in and using authentication, |operation-name|
   has no effect.

   Because MongoDB allows users defined in one database to have
   privileges on another database, you must call |operation-name| while
   using the same database context that you authenticated to.

   If you authenticated to a database such as ``users`` or
   ``$external``, you must issue |operation-name| against this
   database in order to successfully log out.
