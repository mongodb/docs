Index Key Limits
~~~~~~~~~~~~~~~~

If your MongoDB deployment contains indexes with keys which exceed the
:manual:`Index Key Limit</reference/limits/#Index-Key-Limit>`, you must
set the MongoDB server parameter :manual:`failIndexKeyTooLong
</reference/parameters/index.html#param.failIndexKeyTooLong>`
to ``false`` before starting the Live Migration procedure.

.. note::

   Modifying indexes so that they contain no oversized keys is
   preferable to setting the ``failIndexKeyTooLong`` server
   parameter to ``false``. See the :manual:`server manual
   </reference/parameters/index.html#param.failIndexKeyTooLong>`
   for strategies on dealing with oversized index keys.

.. include:: /includes/admonitions/removed-fail-index-key-too-long.rst
