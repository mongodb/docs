A window function lets you calculate results over a moving "window" of
neighboring documents. As each document passes though the pipeline, the  
:pipeline:`$setWindowFields` stage:

- Recomputes the set of documents in the current window
- calculates a value for all documents in the set
- returns a single value for that document

You can use |operatorName| in a ``$setWindowFields`` stage to calculate
rolling statistics for :ref:`time series <manual-timeseries-landing>` or
other related data.

When you use |operatorName| in a ``$setWindowField`` stage, the
``input`` value must be a field name. If you enter an array instead of a
field name, the operation fails.

