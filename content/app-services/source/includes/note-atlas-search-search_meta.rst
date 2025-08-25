.. note:: $$SEARCH_META Variable Availability
   
   The :atlas:`$$SEARCH_META </atlas-search/query-syntax/#aggregation-variable>`
   aggregation variable is only available for functions that :ref:`run as system
   <system-functions>` or if the first role on the searched collection has its
   ``apply_when`` and ``read`` expressions set to ``true``.

   If neither of these two scenarios apply, ``$$SEARCH_META`` is undefined and
   the aggregation will fail.
