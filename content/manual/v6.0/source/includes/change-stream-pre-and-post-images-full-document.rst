Starting in MongoDB 6.0, you can set ``fullDocument`` to:
          
- ``"whenAvailable"`` to output the document post-image, if available,
  after the document was inserted, replaced, or updated.

- ``"required"`` to output the document post-image after the document
  was inserted, replaced, or updated. Raises an error if the post-image
  is not available.
