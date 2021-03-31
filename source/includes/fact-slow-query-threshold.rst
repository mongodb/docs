The Performance Advisor recognizes a query as slow if it takes longer
to execute than the value of
:manual:`slowOpThresholdMs </reference/configuration-options/#operationprofiling-options>`.
By default, this value is ``100`` milliseconds. You can change the
threshold with either the
:manual:`profile </reference/command/profile>`
command or the :manual:`db.setProfilingLevel() </reference/method/db.setProfilingLevel>`
|mongo| shell method.

.. example::

   The following ``profile`` command example sets the threshold at 200
   milliseconds:

   .. code-block:: json

      db.runCommand({
        profile: 0,
        slowOpThresholdMs: 200
      })

If you are running MongoDB 3.6 or later, you can customize the
percentage of slow queries in your logs used by the Performance Advisor
by specifying the ``sampleRate`` parameter.

.. example::

   This sets the slow query threshold to a lower value of 100
   milliseconds but also sets the sample rate to 10%.

   .. code-block:: json

      db.runCommand({
        profile: 0,
        slowOpThresholdMs: 100,
        sampleRate: 0.1
      })

.. note::

   By default, the value of ``profile`` is ``0``. MongoDB recommends
   leaving this value unchanged since other values can negatively
   impact database performance. To learn more, see the
   :manual:`profile </reference/command/profile>` command.
