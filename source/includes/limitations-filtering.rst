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
  base collection, only the view is replicated.
- You cannot specify system collections or system databases in a filter.
- Operations that use the :pipeline:`$out` aggregation stage are only 
  supported if the entire database is specified in the filter. You
  cannot limit the filter to a collection within the database. See:
  :ref:`c2c-filter-with-out`.

