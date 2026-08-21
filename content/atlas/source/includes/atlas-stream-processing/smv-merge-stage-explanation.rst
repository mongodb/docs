The ``$merge`` stage writes each window's total to the
``sample_supplies.sales_by_channel`` collection, maintaining a
running count of completed sales by purchase method:

- ``whenMatched`` updates ``active_count`` only if the incoming
  window is newer than the last one merged.

- ``whenNotMatched`` inserts a new document the first time the
  pipeline sees a purchase method.
