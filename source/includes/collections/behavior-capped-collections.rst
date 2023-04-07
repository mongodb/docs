Starting in 1.3.0, {+c2c-product-name+} supports :ref:`capped
collections <manual-capped-collection>` with some limitations.

- The minimum server version is 6.0.
- :dbcommand:`convertToCapped` is not supported. If you run
  ``convertToCapped``, ``mongosync`` exits with an error.
- :dbcommand:`cloneCollectionAsCapped` is not supported.

Capped collections on the source cluster work normally during sync.

Capped collections on the destination cluster have temporary changes
during sync:

- There is no maximum number of documents.
- The maximum document size is 1PB.

``mongosync`` restores the original values for maximum number of
documents and maximum document size during commit.