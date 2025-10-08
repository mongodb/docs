You must use the :dbcommand:`aggregate` command with the ``cursor`` 
option unless the command includes the ``explain`` option.

- To indicate a cursor with the default batch size, specify ``cursor:
  {}``.

- To indicate a cursor with a non-default batch size, use ``cursor: {
  batchSize: <num> }``.
