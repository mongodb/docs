.. step:: Configure logging for the |jdbc| driver.

   You set logging options the same way that you set other database
   properties. To configure logging, set the following properties:

   .. code-block:: properties

      loglevel=INFO
      logdir=<path-to-log-directory>

   The ``loglevel`` property sets the verbosity of the driver logs. It
   accepts the following values, in order of increasing verbosity:
   ``OFF``, ``SEVERE``, ``WARNING``, ``INFO``, ``FINE``, and ``FINER``.
   The default is ``OFF``.

   The ``logdir`` property sets the directory where the driver writes
   log files. The directory must already exist. If you omit ``logdir``
   or set it to ``console``, the driver writes logs to the console
   instead of to a file.

   .. important::

      In production environments, start with the ``SEVERE`` log level.
      Raise the level only when you must diagnose an issue, because
      each level adds a large amount of output. At the ``FINER``
      level, the driver logs every call that retrieves data for each
      cell of each result set.

   If you connect from Tableau, set these properties in the
   ``mongodb_jdbc.properties`` file. To learn more, see
   :ref:`sql-connect-tableau-logging`.
