You can use the |fts| ``date`` type to index date values. You can query
fields of type ``date`` using the |fts| :ref:`range <range-ref>`,
:ref:`near <near-ref>`, :ref:`in <in-ref>`, and :ref:`equals <equals-ref>` operators. You can
also run a :ref:`facet <fts-facet-ref>` query on ``date`` type fields. 

You can also use the ``date`` type to index:

- Fields whose value is an array of dates. To learn more, see 
  :ref:`fts-array-ref`.

- Date fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type. 

- Date fields for sorting. |fts| automatically indexes all date fields
  in indexes created after :ref:`July 2023 <fts20230710>` for
  :ref:`sorting <sort-ref>` the |fts| results. For preexisting indexes,
  you must rebuild the index to use date fields in the index for
  sorting. To learn more, see :ref:`fts-index-rebuild` and
  :ref:`sort-ref`.  

.. note::

   To query indexed date values inside arrays, you must use the :ref:`range <range-ref>`
   operator. You can't use the :ref:`near <near-ref>` operator
   to query date values stored in an array, even if you have a |fts|
   index on the date values inside the array.

.. include:: /includes/fts/extracts/fts-ib-enable-dynamic-mappings.rst