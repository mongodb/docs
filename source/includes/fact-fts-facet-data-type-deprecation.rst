|fts| support for faceting on numeric and date fields using  
:ref:`bson-data-types-number` and :ref:`bson-data-types-date` type is 
being deprecated. Although you can continue using existing 
:ref:`fts-facet-ref` definitions on the ``number`` and ``date`` types, 
make a note of the following:

- We recommend using the new :ref:`bson-data-types-number-facet` and 
  :ref:`bson-data-types-date-facet` types in all index definitions for 
  faceting on numeric and date fields, respectively.
- Support for faceting on numeric and date fields using 
  :ref:`bson-data-types-number` and :ref:`bson-data-types-date` types 
  will be removed in August 2022.
