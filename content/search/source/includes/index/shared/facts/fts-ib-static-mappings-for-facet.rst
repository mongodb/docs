|fts| only supports :ref:`facet <fts-facet-ref>` operator queries against fields
indexed as the |fts-field-type| type. To perform a normal search also
on the same field, you must index the field as type |data-type| also.

To facet on string fields in embedded documents, you must index the
parent fields as the :ref:`document <bson-data-types-document>` type.
When you facet on a string field inside embedded documents, |fts|
returns facet count for only the number of matching parent documents.

|fts| doesn't :ref:`dynamically <static-dynamic-mappings>` index
|data-type| values for faceting. You must use :ref:`static
mappings <static-dynamic-mappings>` to index |data-type| values for
faceting. You can use the **Visual Editor** or the  **JSON Editor** in
the {+atlas-ui+} to index |data-type| fields as the ``number`` type.
