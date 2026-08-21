The ``$addFields`` stage computes how each event changes the count
of completed sales, and identifies the purchase method that it
applies to:

- The ``$switch`` expression assigns a delta of ``1`` when a sale is
  inserted as ``completed``, ``-1`` when a sale changes from
  ``completed`` to ``returned``, and ``-1`` when a ``completed`` sale
  is deleted. All other events get a delta of ``0``.

- ``_channel`` captures the purchase method from the current
  document, or from the prior document if the event is a delete.
