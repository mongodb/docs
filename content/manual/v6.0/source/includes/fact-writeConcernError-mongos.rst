
.. versionchanged:: 6.0.14

   (*also available in 5.0.30*): When |cmd| executes
   on :program:`mongos`, write concern errors are always
   reported, even when one or more write errors occur.
   In previous releases, the occurrence of write errors could
   cause the |cmd| to not report write concern errors.

