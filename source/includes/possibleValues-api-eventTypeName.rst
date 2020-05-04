.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Alert type

     - Possible values

   * - Host

     - | ``OUTSIDE_METRIC_THRESHOLD``
       | ``HOST_RESTARTED``
       | ``HOST_UPGRADED``
       | ``HOST_NOW_SECONDARY``
       | ``HOST_NOW_PRIMARY``

   * - Replica set

     - | ``NO_PRIMARY``
       | ``TOO_MANY_ELECTIONS``
       | ``PRIMARY_ELECTED``

   * - Sharded cluster

     - ``CLUSTER_MONGOS_IS_MISSING``

   * - User

     - | ``JOINED_GROUP``
       | ``REMOVED_FROM_GROUP``
       | ``USER_ROLES_CHANGED_AUDIT``

   * - Project

     - | ``USERS_AWAITING_APPROVAL``
       | ``USERS_WITHOUT_MULTI_FACTOR_AUTH``
       | ``GROUP_CREATED``

   * - Team

     - | ``JOINED_TEAM``
       | ``REMOVED_FROM_TEAM``

   * - Organization

     - | ``INVITED_TO_ORG``
       | ``JOINED_ORG``

   * - Data Explorer

     - | ``DATA_EXPLORER``
       | ``DATA_EXPLORER_CRUD``

   * - Billing

     - | ``CREDIT_CARD_ABOUT_TO_EXPIRE``
       | ``CHARGE_SUCCEEDED``
       | ``INVOICE_CLOSED``
