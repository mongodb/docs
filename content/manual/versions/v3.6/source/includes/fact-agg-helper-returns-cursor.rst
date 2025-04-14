.. versionchanged:: 2.6
   The :method:`db.collection.aggregate()` method returns a
   cursor and can return result sets of any size. Previous
   versions returned all results in a single document, and the
   result set was subject to a size limit of 16 megabytes.
