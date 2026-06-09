Use ``count`` Instead of ``$count``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use :pipeline:`$count` to get a count of the number of 
documents, we recommend that you use :ref:`count <count-ref>` inside the
:pipeline:`$search` or :pipeline:`$searchMeta` stage instead.  