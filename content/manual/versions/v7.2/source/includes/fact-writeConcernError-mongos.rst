
.. versionchanged:: 7.1

   When |cmd| executes on :program:`mongos`, write concern
   errors are always reported, even when one or more write
   errors occur.

   In previous releases, the occurrence of write errors could
   cause the |cmd| to not report write concern errors.


