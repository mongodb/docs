.. option:: --logRotate reopen | rename

   *Default*: rename

   
   Specifies that you want to rotate logs and how they should be
   rotated.
   
   When this option is set, the logs rotate when you issue a ``FLUSH
   LOGS`` command to the |bi| or when you restart ``mongosqld``.
   
   If you set :option:`--logRotate` to ``rename``:
      The existing log file is closed.
      An `RFC3339 <https://www.ietf.org/rfc/rfc3339.txt>`_-formatted
      timestamp is appended to the closed log file.
      A new log file is created.
   
   If you set :option:`--logRotate` to ``reopen``:
     The existing log file is closed and reopened.
   
   .. note::
   
      On UNIX and macOS platforms, you can issue a `SIGUSR1` signal to
      restart the ``mongosqld`` process and rotate the logs.
   

