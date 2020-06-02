.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - | ``policies[]``
     - array
     - Required
     - Array containing a document for each backup policy item in the
       desired updated backup policy.

   * - | ``policies[i]``
       | ``.id``
     - string
     - Required
     - Unique identifier of the backup policy that you want to update.

   * - | ``policies[i]``
       | ``.policyItems[]``
     - array
     - Required
     - Array of backup policy items.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.frequencyInterval``
     - number
     - Required
     - Desired frequency of the new backup policy item specified by
       ``frequencyType``. A value of ``1`` specifies the first instance
       of the corresponding ``frequencyType``.

       .. example::

          - In a monthly policy item, ``1`` indicates that the monthly
            snapshot occurs on the first day of the month.

          - In a weekly policy item, ``1`` indicates that the weekly
            snapshot occurs on Monday.

       The following frequency values are valid:

       - Hourly: ``1``, ``2,``, ``4``, ``6``, ``8``, and ``12``.

         .. note::

            The only accepted value you can set for frequency interval
            with NVMe clusters is ``12``.

       - Daily: ``1``
       - Weekly: ``1`` through ``7``, where ``1`` is Monday and ``7``
         is Sunday.
       - Monthly: ``1`` through ``28`` and ``40``, where ``1`` is the
         first day of the month and ``40`` is the last day of the
         month.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.frequencyType``
     - string
     - Required
     - Frequency associated with the backup policy item. One of the
       following values: ``hourly``, ``daily``, ``weekly`` or
       ``monthly``.

       .. note::

          You cannot specify multiple ``hourly`` and ``daily`` backup
          policy items.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.id``
     - string
     - Required
     - Unique identifier of the backup policy item.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.retentionUnit``
     - string
     - Required
     - Scope of the backup policy item: ``days``, ``weeks``, or
       ``months``.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.retentionValue``
     - string
     - Required
     - Value to associate with ``retentionUnit``.

       .. note::

          |service| requires that the value specified for
          ``retentionValue`` for less frequent policy items be equal to
          or larger than the value specified for more frequent policy
          items. For example, if the hourly policy item specifies a
          retention of two days, the retention for the weekly policy
          item must be two days or greater.

   * - | ``referenceHourOfDay``
     - number
     - Optional
     - |utc| Hour of day between ``0`` and ``23``, inclusive,
       representing which hour of the day that |service| takes
       snapshots for backup policy items.

   * - | ``referenceMinuteOfHour``
     - number
     - Optional
     - |utc| Minutes after ``referenceHourOfDay`` that |service| takes
       snapshots for backup policy items. Must be between ``0`` and
       ``59``, inclusive.

   * - | ``restoreWindowDays``
     - number
     - Optional
     - Number of days back in time you can restore to with
       {+PIT-Restore+} accuracy. Must be a positive, non-zero integer.

       Applies to {+pit-restore+}s only.

   * - | ``updateSnapshots``
     - boolean
     - Optional
     - Specify ``true`` to apply the retention changes in
       the updated backup policy to snapshots that |service| took
       previously.

