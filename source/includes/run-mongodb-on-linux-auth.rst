  To restart MongoDB with authentication, run the :binary:`~bin.mongod`
  process at the system prompt. If necessary, specify the path of the
  :binary:`~bin.mongod` or the data directory. See the following
  examples.

  If you do not use the default data directory (i.e., ``/data/db``),
  specify the path to the data directory using the --dbpath flag.

  .. code-block:: sh

     mongod --dbpath <path to data directory> --auth