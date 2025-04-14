MongoDB 3.6 removes the use of :dbcommand:`aggregate` command
**without** the ``cursor`` option unless the command includes the
``explain`` option. Unless you include the ``explain`` option, you must
specify the cursor option.

- To indicate a cursor with the default batch size, specify ``cursor:
  {}``.

- To indicate a cursor with a non-default batch size, use ``cursor: {
  batchSize: <num> }``.
