The ``$merge`` stage writes each event to the collection on
``<destination-connection-name>`` that matches its source namespace:

- ``db`` and ``coll`` read the source event's namespace metadata, so
  the same pipeline routes ``customers`` events to ``customers`` and
  ``accounts`` events to ``accounts``.

- ``whenMatched`` and ``whenNotMatched`` each branch on operation
  type, so the stage deletes, replaces, or inserts the destination
  document depending on the source event.
