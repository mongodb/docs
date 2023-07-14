On Windows, FTDC requires access permissions from the Performance
Monitor Users and Performance Log Users groups, as summarized `in the
Microsoft documentation here
<https://learn.microsoft.com/en-us/windows/win32/perfctrs/restricting-access-to-performance-extension--dlls>`_.
If the user running :binary:`mongod <bin.mongod>` and :binary:`mongos
<bin.mongos>` is not an administrator, add them to these groups to log
FTDC data.