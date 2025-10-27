.. note:: 

   .. include:: /includes/fts/facts/fact-embedded-document-preview.rst

You can use the |fts| ``embeddedDocuments`` type to index fields in
documents and objects that are elements of an array. 

|fts| indexes embedded documents independent of their parent document. 
Each indexed document contains only the fields that are part of the 
embedded document array element. 

You can use the :ref:`embeddedDocument <embedded-document-ref>`
operator to perform element-wise queries (similar to ``$elemMatch``) on 
fields indexed within ``embeddedDocuments`` type. By default, |fts|
returns all documents with at least one array element matching the
query. You can filter the results to return only the matching array
elements by using the ``storedSource`` option in your index, and then
specifying ``returnScope`` in your query. 

You can facet on date, numeric, and string fields in arrays of objects. 
When you facet on these fields using the root ``embeddedDocument``
operator, |fts| returns facet counts based on the number of matching
root documents.

To retrieve facet counts based on ``embeddedDocuments`` array elements,
configure ``storedSource`` to store the fields on ``mongot`` and set the
context for the query by using the ``returnScope`` option. To learn more
about the syntax and usage of ``returnScope``, see :ref:`fts-return-scope`. 

.. note:: 

   Use the ``embeddedDocuments`` type to index fields inside array of
   documents so that you can query each nested document individually. If
   you only need to query nested documents in relation to the parent
   document, use the :ref:`document <bson-data-types-document>` type.  

.. include:: /includes/fts/extracts/fts-ib-static-mappings.rst

To index all fields in an embedded document including fields that
|fts| doesn't dynamically index, define the fields in the index
definition.

``embeddedDocuments`` Type Limitations 
--------------------------------------

The following limitations apply when indexing with the ``embeddedDocuments`` type:

- You can use ``embeddedDocuments`` only on fields with up to ``5`` 
  levels of nesting. An ``embeddedDocuments`` field can't have more 
  than ``4`` parent ``embeddedDocuments`` fields.
- You can't define a field inside the ``embeddedDocuments`` type 
  as the deprecated :ref:`knnVector <fts-data-types-knn-vector>` type.
- For :ref:`highlighting <highlight-ref>` fields within embedded
  documents, you must also index the parent of the field that you want
  to highlight as the :ref:`document <bson-data-types-document>` type. 
- The following operations require you to also index the parents of the
  embedded document child field as the :ref:`document
  <bson-data-types-document>` type: 
  
  - :ref:`Faceted search <fts-facet-ref>` on nested fields to retrieve
    counts based on the parent documents. You must also index the field
    that you want to facet on as the ``token``, ``number`` or ``date``
    type, respectively.
  - :ref:`Highlight <highlight-ref>` fields within embedded documents.
    For an example, see the :ref:`embedded-documents-tutorial` tutorial.
  - :ref:`Sort <sort-ref>` the parent documents by a nested field. You
    must also index the fields that you want to use for sorting.
  
2,100,000,000 Index Objects Limit 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fts/facts/fact-fts-embedded-documents-limitation.rst
