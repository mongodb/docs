Starting in MongoDB 5.1, certain wire protocol opcodes are removed from
the ``mongo`` shell. The shell will not connect to any
version of :binary:`~bin.mongod` or :binary:`~bin.mongos` less than
3.6 since these versions do not support the OP_MSG RPC protocol.

