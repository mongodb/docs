:binary:`~bin.mongod` includes a :ref:`Full Time Diagnostic Data Capture
<ftdc-stub>` mechanism to assist MongoDB engineers with troubleshooting
deployments. If this thread fails, it terminates the originating process.
To avoid the most common failures, confirm that the user running the
process has permissions to create the FTDC ``diagnostic.data``
directory. For ``mongod`` the directory is within
:setting:`storage.dbPath`. For ``mongos`` it is parallel to :setting:`systemLog.path`.