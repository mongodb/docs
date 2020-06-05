.. list-table::
   :widths: 20 10 60 10

   * - Option 
     - Type
     - Description
     - Required?

   * - ``--authDB``
     - string
     - Name of the authentication database for this user. Defaults to
       ``admin``.
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
       cluster to update. If omitted, uses the project ID in 
       the profile or :ref:`environment variable <mcli-env-var>`.
     - no
