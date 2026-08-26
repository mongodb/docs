The ``$replaceRoot`` stage prepares each event for the sink stage. It
selects the document key for a delete event and the full document for
every other event, so the ``$merge`` stage always receives a document
that has an ``_id`` field.
