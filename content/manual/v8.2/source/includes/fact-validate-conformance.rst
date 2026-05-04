*Optional*. If ``true``, the collection is checked to ensure the
:ref:`BSON documents <bson-document-format>` conform to the BSON
specifications. The checks increase the time to complete the validation
operation. Any issues are returned as a warning.

``checkBSONConformance``:

- Default is ``false``.
- Is enabled when ``full`` is set to ``true``.
- Cannot be used with:

  - ``repair`` set to ``true``.
  - ``metadata`` set to ``true``.

.. versionadded:: 6.2
