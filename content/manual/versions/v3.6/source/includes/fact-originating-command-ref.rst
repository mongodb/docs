.. versionchanged:: 3.6

   For ``"getmore"`` operations which retrieve the next batch of
   results from a cursor, the ``originatingCommand`` field contains the
   full command object (e.g. ``find`` or ``aggregate``) which originally
   created that cursor.