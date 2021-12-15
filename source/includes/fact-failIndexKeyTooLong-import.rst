Index Key Limits
~~~~~~~~~~~~~~~~

If your MongoDB deployment contains indexes with keys which exceed the
:manual:`Index Key Limit</reference/limits/#Index-Key-Limit>`, before
you start the Live Migration procedure, modify indexes so that they do
not contain oversized keys. To learn more about about strategies for
dealing with oversized keys, see
:parameter:`failIndexKeyTooLong <param.failIndexKeyTooLong>` 
in the MongoDB Server documentation.

.. include:: /includes/admonitions/removed-fail-index-key-too-long.rst
