Enable {+qe+} at collection creation. You can't encrypt fields on
documents that are already in a collection. If you have existing data 
that needs encryption, consider explicitly creating a new collection and
then using the :pipeline:`$out` aggregation stage to move documents into it.