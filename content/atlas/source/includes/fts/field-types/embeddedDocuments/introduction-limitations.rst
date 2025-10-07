.. note:: 

   .. include:: /includes/fts/facts/fact-embedded-document-preview.rst

You can use the |fts| ``embeddedDocuments`` type to index fields in
documents and objects that are elements of an array. |fts| indexes
embedded documents independent of their parent document. Each indexed
document contains only fields that are part of the embedded document
array element. You can also :ref:`configure dynamic mappings
<fts-configure-dynamic-mappings>` for fields that are part of the
embedded document array element. You can use only the
:ref:`embeddedDocument <embedded-document-ref>` operator to query fields
indexed as ``embeddedDocuments`` type. 

You can facet on date, numeric, and string fields in arrays of objects.
When you facet on these fields, |fts| returns facet counts based on the
number of matching root documents. 

.. note:: 

   Use the ``embeddedDocuments`` type to index fields inside array of
   documents so that you can query each nested document individually. If
   you only need to query nested documents in relation to the parent
   document, use the :ref:`document <bson-data-types-document>` type.  

.. include:: /includes/fts/extracts/fts-ib-static-mappings.rst

To index all fields in an embedded document including fields that
|fts| doesn't dynamically index, define the fields in the index
definition. For string faceting, |fts| counts string facets once for
each document in the result set.

``embeddedDocuments`` Type Limitations 
--------------------------------------

The following limitations apply when indexing with the ``embeddedDocument`` type:

- You can use ``embeddedDocuments`` only on fields with up to ``5`` 
  levels of nesting. An ``embeddedDocuments`` field can't have more 
  than ``4`` parent ``embeddedDocuments`` fields.
- You can't define a field inside  the ``embeddedDocuments`` type 
  as the deprecated :ref:`knnVector <fts-data-types-knn-vector>` type.
- For :ref:`highlighting <highlight-ref>` fields within embedded
  documents, you must also index the parent of the field that you want
  to highlight as the :ref:`document <bson-data-types-document>` type. 
- You can do the following only if you index the parents of the embedded
  document child field as the :ref:`document <bson-data-types-document>`
  type: 
  
  - :ref:`Faceted search <fts-facet-ref>` on string fields within
    embedded documents. You must also index the field that you want to
    facet on as the :ref:`token <bson-data-types-token>`
    type. 

    When you facet on a string field inside embedded documents, |fts|
    returns facet count for only the number of matching parent
    documents. 
  
    You can't facet on numeric and date fields in embedded documents.

  - :ref:`Highlight <highlight-ref>` fields within embedded documents.
    For an example, see the :ref:`embedded-documents-tutorial` tutorial.
  - :ref:`Sort <sort-ref>` by the parent of the embedded document field.
    You must also index the embedded document field with string values
    as the :ref:`token <bson-data-types-token>` type. For child fields
    with number and date values, enable dynamic mapping to index those
    fields automatically. For an example, see :ref:`Sort Example
    <embedded-document-query-examples>`.

2,100,000,000 Index Objects Limit 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fts/facts/fact-fts-embedded-documents-limitation.rst
