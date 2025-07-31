Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``document`` type takes the following parameters:

.. list-table::
   :widths: 15 10 15 50 10
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string
     - Required
     - Human-readable label that identifies the field type.
       Value must be ``document``.
     - 

   * - ``dynamic``
     - boolean
     - Optional
     - Flag that indicates whether |fts| recursively indexes all fields 
       and embedded documents. If set to ``true``, |fts| recursively 
       indexes all fields and embedded documents in the ``document`` 
       except fields of :ref:`certain data types <bson-data-chart>`.
       
       To index all fields in a document including fields that 
       |fts| doesn't dynamically index, define the fields 
       in the index definition.

       If omitted or set to ``false``, you must specify individual 
       fields to index.

       .. include:: /includes/fts/facts/dynamic-flag-considerations.rst

     - false

   * - ``fields``
     - document
     - Optional
     - Document that maps field names to field definitions. To learn 
       more, see an :ref:`example <index-config-example>`. This is 
       required if ``dynamic`` is omitted or set to ``false``. 
     - 
