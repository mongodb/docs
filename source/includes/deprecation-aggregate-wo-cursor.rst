MongoDB 3.4 deprecates the use of :dbcommand:`aggregate` command
**without** the ``cursor`` option, unless the pipeline includes the
``explain`` option. When returning aggregation results inline using the
:dbcommand:`aggregate` command, specify the cursor option using the
default batch size ``cursor: {}`` or specify the batch size in the
cursor option ``cursor: { batchSize: <num> }``.
