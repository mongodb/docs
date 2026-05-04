If you use an antivirus (AV) scanner or an endpoint detection and
response (EDR) scanner, configure your scanner to exclude the
:setting:`database storage path <storage.dbPath>` and the
:setting:`database log path <systemLog.path>` from the scan.

The data files in the ``database storage path`` are compressed.
Additionally, if you use the :ref:`encrypted storage engine
<security-encryption-at-rest>`, the data files are also encrypted. The
I/O and CPU costs to scan these files may significantly decrease
performance without providing any security benefits.

If you don't exclude the directories in your ``database storage path``
and ``database log path``, the scanner could quarantine or delete
important files. Missing or quarantined files can corrupt your database
and crash your MongoDB instance.
