.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option
     - Type
     - Description
     - Required?

   * - ``<alertID>``
     - string
     - Unique identifier of the alert you want to describe.
     - yes

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the public and private 
       keys for the project are saved. If omitted, uses the 
       ``default`` profile. To learn more about creating a 
       profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project that contains the 
       alert to describe. If omitted, uses the project ID in 
       the profile or :ref:`environment variable <mcli-env-var>`.
     - yes