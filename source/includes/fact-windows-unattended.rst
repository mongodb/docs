You may install MongoDB unattended on Windows from the command line
using ``msiexec.exe``. Open a shell in the directory containing the
``.msi`` installation binary of your choice and invoke:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="<installation directory>"

By default, this method installs the following MongoDB binaries:
``mongod.exe``, ``mongo.exe``, ``mongodump.exe``,
``mongorestore.exe``, ``mongoimport.exe``, ``mongoexport.exe``,
 ``mongostat.exe``, and ``mongotop.exe``.
You can specify the installation location for the executable by
modifying the ``<installation directory>`` value. To install specific
subsets of the binaries, you may specify an``ADDLOCAL`` argument:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="<installation directory>" ADDLOCAL=<binary set(s)>

The ``<binary set(s)>`` value is a comma-separated list including one
or more of the following:

- ``Server`` - includes ``mongod.exe``

- ``Client`` - includes ``mongo.exe``

- ``MonitoringTools`` - includes ``mongostat.exe`` and ``mongotop.exe``

- ``ImportExportTools`` - includes ``mongodump.exe``,
  ``mongorestore.exe``, ``mongoexport.exe``, and ``mongoimport.exe``)

- ``MiscellaneousTools`` - includes ``bsondump.exe``,
  ``mongofiles.exe``, ``mongooplog.exe``, and ``mongoperf.exe``

For instance, to install *only* the entire set of tools to
``C:\mongodb``, invoke:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="C:\mongodb" ADDLOCAL=MonitoringTools,ImportExportTools,MiscellaneousTools

You may also specify ``ADDLOCAL=ALL`` to install the complete set of
binaries, as in the following:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="C:\mongodb" ADDLOCAL=ALL
