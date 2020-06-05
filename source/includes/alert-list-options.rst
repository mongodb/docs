.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option
     - Type
     - Description
     - Required?

   * - ``--limit``
     - integer
     - Number of items per page, up to a maximum of 500. Defaults to    
       ``100`` if not specified.
     - no

   * - ``--page``
     - integer
     - Page number (1-based). Defaults to ``1`` if not specified.
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the public and private 
       keys for the project are saved. If omitted, uses the 
       {+default-profile+}. To learn more about creating a 
       profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project that contains the 
       alerts to retrieve. If omitted, uses the project ID in 
       the profile or :ref:`environment variable <mcli-env-var>`.
     - no

   * - ``--status``
     - string
     - Status of the alerts you want to return. The {+mcli+} returns 
       alerts that match the status you indicate. Accepted values 
       include:

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - ``TRACKING``
            - Alert conditions exist, but the condition hasn't
              persisted for long enough to trigger an alert.

          * - ``OPEN``
            - Alert is open.

          * - ``CLOSED``
            - Alert is closed.

     - no
