.. list-table::
   :widths: 15 10 75
   :header-rows: 1

   * - Field
     - Type
     - Description

   * - ``enabled``
     - boolean 
     - Indicates whether the project's clusters deployed to |aws| use 
       custom DNS.

       If ``true``, the :doc:`/reference/api/clusters-get-all` and
       :doc:`/reference/api/clusters-get-one` endpoints return the
       ``connectionStrings.private`` and ``connectionStrings.privateSrv``
       fields for clusters deployed to |aws|.
