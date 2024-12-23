
.. versionchanged:: 7.0.6 

   (*also available in 6.0.14 and 5.0.30*): When |cmd| is
   received from :program:`mongos`, write concern errors are
   always reported, even when one or more write errors occur.
   In previous releases, the occurrence of write errors could
   cause the |cmd| to not report write concern errors.


