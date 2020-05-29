.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option
     - Type
     - Description
     - Required?

   * - ``<alertID>``
     - string
     - ID of the alert you want to acknowledge or un-acknowledge.
     - yes

   * - ``--forever``
     - string
     - Prevent the alert from resuming at any point in the future.

       You can't set both ``--forever`` and ``--until`` in the same
       command.
     - no

   * - ``--until``
     - string
     - |iso8601-time| through which you acknowledge this alert. After
       this time passes, the alert becomes un-acknowledged.

       You can't set both ``--until`` and ``--forever`` in the same
       command.
     - no

   * - ``--comment``
     - string
     - Comment describing the alert acknowledgement. If included, wrap
       the comment in double quotes.
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s
       for the project are saved. If omitted, uses the ``default``
       profile.

       .. seealso::

          To learn more about creating a profile, see
          :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project that contains the cluster. If
       omitted, uses the project ID in the profile or
       :ref:`environment variable <mcli-env-var>`.
     - no
