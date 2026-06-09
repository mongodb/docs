Use ``facet`` Instead of ``$group``  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use :pipeline:`$group` to get basic counts for field 
aggregations, you can use :ref:`fts-facet-ref` inside the
:pipeline:`$search` stage. If you need only metadata results, you can 
use :ref:`fts-facet-ref` inside inside the :pipeline:`$searchMeta` 
stage instead.  