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

You may specify either fields to include or fields to exclude, 
but not both. The exception to this rule is the ``_id`` field, which you may
withhold from any query. The following code shows both an invalid and valid 
projection:

.. code-block:: javascript
   :copyable: false

   // Invalid:
   // You can't simultaneously include `name` 
   // and exclude `address`
   { "name": 1, "address": 0 }

   // Valid:
   { "_id": 0, "name": 1 }
