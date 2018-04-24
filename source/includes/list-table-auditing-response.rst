.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description

   * - ``auditAuthorizationSuccess``
     - boolean
     - Indicates whether the auditing system captures
       successful authentication attempts for 
       audit filters using the ``"atype" : "authCheck"`` auditing
       event. For more information, 
       see :manual:`auditAuthorizationSuccess 
       </reference/parameters/#param.auditAuthorizationSuccess>`

   * - ``auditFilter``
     - string
     - JSON-formatted audit filter used by the project

   * - ``configurationType``
     - string
     - Denotes the creation method for the audit filter. Possible values
       are:

       - ``NONE`` - auditing not configured for the project.
       - ``FILTER_BUILDER`` - auditing configured via |service| UI filter builder
       - ``FILTER_JSON`` - auditing configured via |service| custom filter or API

   * - ``enabled``
     - boolean
     - ``true`` if the project associated to the ``{GROUP-ID}`` has
       :doc:`database auditing </database-auditing>` enabled.