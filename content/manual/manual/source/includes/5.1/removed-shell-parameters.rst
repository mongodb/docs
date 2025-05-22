MongoDB 5.1 removes the following parameters from the
``mongo`` shell:

.. list-table::
    :header-rows: 1
    :widths: 25 75

    * - Removed Parameters
      - Description
    * - ``--useLegacyWriteOps``
      - The ability to use OP_INSERT, OP_UPDATE, and OP_DELETE is
        removed. The shell will only use OP_MSG write commands.
    * - ``--writeMode``
      - The ability to use OP_INSERT, OP_UPDATE, and OP_DELETE is
        removed. The shell will only use OP_MSG write commands.
    * - ``--readMode``
      - The ability to use OP_QUERY legacy find is removed. The shell
        will only use OP_MSG find commands.
    * - ``--rpcProtocols``
      - Support for the OP_QUERY RPC protocol is removed. The shell
        will always use the OP_MSG RPC protocol.

