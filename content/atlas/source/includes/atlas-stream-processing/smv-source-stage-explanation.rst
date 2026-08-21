The ``$source`` stage opens the change stream on the
``sample_supplies.sales`` collection, which is the source of every
event the pipeline processes:

- ``fullDocument: "required"`` includes the current version of the
  document in every change event.

- ``fullDocumentBeforeChange: "required"`` includes the document as
  it existed before the change, which the pipeline needs to detect
  a sale that changes from ``completed`` to ``returned``.
