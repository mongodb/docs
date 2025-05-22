Starting in MongoDB 6.0, you can use the new
``fullDocumentBeforeChange`` field and set it to:

- ``"whenAvailable"`` to output the document pre-image, if available,
  before the document was replaced, updated, or deleted.

- ``"required"`` to output the document pre-image before the document
  was replaced, updated, or deleted. Raises an error if the pre-image
  is not available.

- ``"off"`` to suppress the document pre-image. ``"off"`` is the
  default.
