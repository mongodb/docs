You can use the |fts| ``number`` type to index fields with numeric
values of ``int32``, ``int64``, and ``double`` data types.
You can use the :ref:`equals <equals-ref>`, :ref:`range <range-ref>`, and :ref:`near <near-ref>`
operators to query indexed fields of type ``number``. You can also run a
:ref:`facet <fts-facet-ref>` query on ``number`` type fields.

.. note::

   To query numeric values in arrays, you can use only the :ref:`range <range-ref>` 
   operator.

|fts| automatically indexes all numeric fields in indexes created after
:ref:`July 2023 <fts20230710>` for :ref:`sorting <sort-ref>` the |fts|
results. For preexisting indexes, you must rebuild the index to use
number fields in the index for sorting. To learn more, see
:ref:`fts-index-rebuild` and :ref:`sort-ref`.

.. include:: /includes/fts/extracts/fts-ib-enable-dynamic-mappings.rst