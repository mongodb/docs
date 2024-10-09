.. include:: /includes/clustered-collections-introduction.rst

See :ref:`clustered-collections`.

``clusteredIndex`` has the following syntax:

.. code-block:: javascript
   :copyable: false

   clusteredIndex: {
      key: { <string> },
      unique: <boolean>,
      name: <string>
   }

``key``
   Required. The clustered index key field. Must be set to ``{ _id:
   1 }``. The default value for the ``_id`` field is an
   automatically generated unique :ref:`object identifier
   <objectid>`, but you can set your own :ref:`clustered index key
   values <clustered-collections-clustered-index-key-values>`.

``unique``
   Required. Must be set to ``true``. A unique index indicates the
   collection will not accept inserted or updated documents where
   the clustered index key value matches an existing value in the
   index.

``name``
   Optional. A name that uniquely identifies the clustered index.

.. versionadded:: 5.3
