On Windows, to collect system data such as disk, cpu, and memory, FTDC requires Microsoft access permissions from the following groups:

- Performance Monitor Users

- Performance Log Users 

If the user running :binary:`mongod <bin.mongod>` and :binary:`mongos
<bin.mongos>` is not an administrator, add them to these groups to log
FTDC data. For more information, see `the Microsoft documentation here <https://learn.microsoft.com/en-us/windows/win32/perfctrs/restricting-access-to-performance-extension--dlls>`_.