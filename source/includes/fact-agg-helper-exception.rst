.. versionchanged:: 2.4
   If an error occurs, the :method:`~db.collection.aggregate()` helper
   throws an exception. In previous versions, the helper returned a
   document with the error message and code, and ``ok`` status field
   not equal to ``1``, same as the :dbcommand:`aggregate` command.
