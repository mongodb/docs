.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s 
       for the project are saved. If omitted, uses the ``default`` profile. 
       To learn more about creating a profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project for which to retrieve events.
     - either ``--orgId`` or ``--projectId`` required

   * - ``--orgId``
     - string
     - Unique identifier of the organization for which to retrieve events.
     - either ``--orgId`` or ``--projectId`` required

   * - ``--limit``
     - integer
     - Number of items per page.
     - no

   * - ``--maxDate``
     - string
     - Return events whose created date is less than or equal to it.
     - no

   * - ``--minDate``
     - string
     - Return events whose created date is greater than or equal to it.
     - no

   * - ``--page``
     - integer
     - Page number.
     - no

.. note::

   The ``--orgId`` and ``--projectId`` flags are exclusive. You must use one or
   the other, but not both.
