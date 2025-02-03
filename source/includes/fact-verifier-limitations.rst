
Compatibility
~~~~~~~~~~~~~

The embedded verifier is not available in mongosync 1.8 and
earlier.

For alternative verification methods, see :ref:`c2c-verification`.

Limitations
~~~~~~~~~~~

The embedded verifier has the following limitations:

- The verifier doesn't support sharded clusters. If the
  migration includes a sharded cluster, ``mongosync`` disables
  the verifier.

- ``mongosync`` stores the verifier state in memory, which can
  result in a significant memory overhead. To run the verifier,
  ``mongosync`` requires approximately 10 GB of memory, plus an
  additional 500 MB for every 1 million documents.

- The verifier cannot be resumed. If a user stops or pauses sync
  and then starts ``mongosync`` again for any reason, the
  verification process restarts from the beginning. This can
  cause verification to fall substantially behind the migration.

- The :ref:`/reverse <c2c-api-reverse>` endpoint disables the
  verifier. It remains disabled after additional calls to the
  ``/reverse`` endpoint.

- .. include:: /includes/fact-verifier-buildIndexes

- .. include:: /includes/fact-verification-support-1.9.0.rst

Unsupported Verification Checks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-verifier-unsupported
