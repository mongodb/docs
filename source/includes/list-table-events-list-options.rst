.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

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

   * - ``--orgId``
     - string
     - Unique identifier of the organization for which to retrieve events.
     - yes

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--page``
     - integer
     - Page number.
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s 
       for the project are saved. If omitted, uses the {+default-profile+}. 
       To learn more about creating a profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - .. include:: /includes/extracts/fact-basic-options-project-id.rst
     - yes

.. note::

   The ``--orgId`` and ``--projectId`` flags are exclusive. You must use one or
   the other, but not both.
