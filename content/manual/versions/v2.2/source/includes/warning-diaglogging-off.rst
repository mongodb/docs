.. warning::

   Setting the diagnostic level to ``0`` will cause :binary:`~bin.mongod`
   to stop writing data to the :term:`diagnostic log` file. However,
   the :binary:`~bin.mongod` instance will continue to keep the file open,
   even if it is no longer writing data to the file.  If you want to
   rename, move, or delete the diagnostic log you must cleanly shut
   down the :binary:`~bin.mongod` instance before doing so.
