 Unattended Installation of MongoDB for Windows
-----------------------------------------------

You may install MongoDB unattended on Windows from the command line
using ``msiexec.exe``. Open a shell in the directory containing the
``.msi`` installation binary of your choice and invoke:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="<installation directory>"

By default, this method installs all MongoDB binaries except the
router (``mongos.exe``) and miscellaneous tools (``bsondump.exe``,
``mongofiles.exe``, ``mongooplog.exe``, and ``mongoperf.exe``) to the
directory specified in ``<installation directory>``. To install
specific subsets of the binaries, you may specify an ``ADDLOCAL``
argument:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="<installation directory>" ADDLOCAL=<binary set(s)>

where ``<binary set(s)>`` is a comma-separated list of one or more of:

- ``Server`` - includes ``mongod.exe``
- ``Client`` - includes ``mongo.exe``
- ``MonitoringTools`` - includes ``mongostat.exe`` and
  ``mongotop.exe``
- ``ImportExportTools`` - includes ``mongodump.exe``,
  ``mongorestore.exe``, ``mongoexport.exe``, and ``mongoimport.exe``)
- ``MiscellaneousTools`` - includes ``bsondump.exe``,
  ``mongofiles.exe``, ``mongooplog.exe``, and ``mongoperf.exe``

For instance, to install the entire set of tools only to
``C:\mongodb``, invoke:

.. code-block:: powershell

   msiexec.exe /q /i mongodb-<version>-signed.msi INSTALLLOCATION="C:\mongodb" ADDLOCAL=MonitoringTools,ImportExportTools,MiscellaneousTools

You may also specify ``ADDLOCAL=ALL`` to install the complete set of binaries.
