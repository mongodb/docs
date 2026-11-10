For MongoDB instances running on Linux:

- When the :binary:`~bin.mongod` and :binary:`~bin.mongos` processes
  receive a ``SIGUSR2`` signal, backtrace details are added to the logs
  for each process thread.

- Backtrace details show the function calls for the process, which can
  be used for diagnostics and provided to MongoDB Support if required.

The backtrace functionality is available for these architectures:

- ``x86_64``
- ``arm64`` (starting in MongoDB 5.0.10)
