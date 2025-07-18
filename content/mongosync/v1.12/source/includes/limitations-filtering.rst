- Filtering is not supported with :ref:`reversible sync
  <c2c-api-reverse>`.
- The destination cluster must not contain user data prior to starting.
- The destination cluster must not contain the
  ``mongosync_reserved_for_internal_use`` system database prior to
  starting.
- You cannot modify a filter that is in use. To create a new filter,
  see: :ref:`c2c-change-filter`.
- You can only rename collections in certain situations. For more
  details see: :ref:`c2c-filter-renaming-collections`.
- If a filter includes a :ref:`view <views-landing-page>` but not the
  base collection, only the view metadata syncs to the
  destination cluster. To include the view documents, you must
  also sync the base collection.
- You cannot specify system collections or system databases in a filter.
- To use the :pipeline:`$out` aggregation stage or the :dbcommand:`mapReduce`
  command (when set to create or replace a collection) with filtering,
  you must configure the filter to use the entire database.
  You cannot limit the filter to collections within the database.

  For more information, see :ref:`c2c-filter-with-out`.
- Filtering does not support dual :ref:`write 
  blocking <c2c-write-blocking>`. You can use destination-only
  write-blocking. 

