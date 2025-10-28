.. note:: 

   .. include:: /includes/fts/facts/fact-embedded-document-preview.rst

You can use the |fts| ``embeddedDocuments`` type to index fields in
documents and objects that are elements of an array. |fts| indexes
embedded documents independent of their parent document. Each indexed
document contains only fields that are part of the embedded document
array element. 

To query fields indexed within an ``embeddedDocuments``
mapping, you must do one of the following:

- Use the :ref:`embeddedDocument <embedded-document-ref>` operator with
  the ``path`` specified as the ``embeddedDocuments`` field. 
- Use ``storedSource`` index option and specify the
  ``embeddedDocuments`` field in the ``returnScope`` query option. 
  
You can also :ref:`configure dynamic mappings <fts-configure-dynamic-mappings>` 
to automatically index fields that are part of the embedded document
array element.

Considerations 
--------------

Facet on Embedded Documents 
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can facet on date, numeric, and string fields within
``embeddedDocuments`` type field to retrieve facet counts based on the
number of matching ``embeddedDocuments`` elements. To do this, you must:  

1. Configure ``storedSource`` to store ``embeddedDocuments`` type fields. 
#. Set the query option ``returnScope.path`` as the
   ``embeddedDocuments`` field. To learn more about the syntax and usage
   of ``returnScope``, see :ref:`fts-return-scope`. 

To facet on fields within objects in arrays based on the number of
matching root documents, index the path as a ``document`` type. 

Stored Source for Embedded Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the :ref:`storedSource <fts-stored-source-definition>`
option to store and return fields inside an ``embeddedDocuments`` type.
You can configure all or a subset of the fields to store or exclude from
storage at each level of nesting. This allows you to return only the
objects within the array that match the query criteria, rather than the
entire root document. To learn more about the syntax for
``storedSource``, see :ref:`fts-stored-source-definition`.  

To return the stored field:

- Specify ``returnScope.path`` option as the ``embeddedDocuments`` type
  field. To learn more, see :ref:`fts-return-scope`. 
- Set ``returnStoredSource`` to ``true`` to retrieve only the stored
  fields instead of entire documents from the collection. To learn more,
  see :ref:`fts-return-stored-source-option`.  

You can't include ``embeddedDocuments`` fields that were specified as
``storedSource.exclude`` at a higher-level. 

``embeddedDocuments`` Type Limitations 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following limitations apply when indexing with the
``embeddedDocument`` type: 

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
  
  - :ref:`Facet <fts-facet-ref>` on fields within objects in arrays
    based on the number of matching root documents.
  - :ref:`Highlight <highlight-ref>` fields within embedded documents.
    For an example, see the :ref:`embedded-documents-tutorial` tutorial.
  - :ref:`Sort <sort-ref>` the parent documents by a nested field. You
    must also index the fields that you want to use for sorting.
  
2,100,000,000 Index Objects Limit 
`````````````````````````````````

.. include:: /includes/fts/facts/fact-fts-embedded-documents-limitation.rst
