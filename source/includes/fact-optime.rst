- ``ts``, the :ref:`Timestamp <document-bson-type-timestamp>` of
  the operation.

- ``t``, the :data:`~replSetGetStatus.term` in which the
  operation was originally generated on the primary.

  If using :rsconf:`protocolVersion: 0 <protocolVersion>`, ``t`` is
  equal to ``-1``.
