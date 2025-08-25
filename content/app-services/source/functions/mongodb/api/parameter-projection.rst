A document that specifies which fields MongoDB should include or omit in
matching documents.
    
To return all fields in the matching documents, omit this parameter or
specify an empty projection document (``{}``).

To return specific fields and the document's ``_id``, specify the fields
in the projection document with a value of ``1``:

.. code-block:: javascript

   // Includes the field in returned documents
   { <Field Name>: 1 }

To withhold specific fields, specify the fields in the projection
document with a value of ``0``:

.. code-block:: javascript

   // Withholds the field from returned documents
   { <Field Name>: 0 }

.. note::

   You may specify either fields to include or fields to withhold
   but not both. For example, the following projection is
   **invalid** because it simultaneously includes the ``name``
   field and withholds the ``address`` field:

   .. code-block:: javascript

      // Invalid
      // Can't simultaneously include and withhold
      { "name": 1, "address": 0 }

   The exception to this rule is the ``_id`` field, which you may
   withhold from any query:

   .. code-block:: javascript

      // Valid
      // Can exclude _id while including other fields
      { "_id": 0, "name": 1 }
