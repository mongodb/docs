The resharding operation performs these phases in order:

#. The clone phase duplicates the current collection data.
#. The building indexes phase builds indexes on the resharded collection.
#. The catch-up phase applies any pending write operations to the 
   resharded collection.
#. The commit phase renames the temporary collection and drops the old 
   collection to perform a cut-over.
