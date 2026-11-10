.. _|idref|-fullDocumentBeforeChange:

The document before changes were applied by the operation.
That is, the document pre-image.

This field is available when you enable the ``changeStreamPreAndPostImages`` 
field for a collection using :method:`db.createCollection()` method or the 
:dbcommand:`create` or :dbcommand:`collMod` commands.

.. versionadded:: 6.0
