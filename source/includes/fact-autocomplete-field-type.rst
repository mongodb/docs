You can use the ``autocomplete`` data type to index text values for 
autocompletion. You can configure an ``autocomplete`` field to satisfy 
a variety of use cases. To learn more about the configuration options 
available in the ``autocomplete`` data type, such as tokenization 
strategy and diacritic folding, see 
:ref:`bson-data-types-autocomplete`. You can use the :ref:`autocomplete 
<autocomplete-ref>` operator to query only fields indexed using 
:ref:`bson-data-types-autocomplete`.

.. note:: 

   - You can't use the ``autocomplete`` type to index fields whose 
     value is an array of strings.

   - You can use the ``autocomplete`` type to index string fields 
     inside an array of documents indexed as the
     :ref:`bson-data-types-embedded-documents` type.
