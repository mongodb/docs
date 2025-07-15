.. note::

   The following example queries the |index-name| index by 
   running the ``.aggregate`` command against the View named
   |collection|. If your cluster
   is running MongoDB v8.0, you must query the source collection
  (e.g. |source-collection|) using the index on the View. Upgrade to MongoDB v8.1+ to query the View directly.
