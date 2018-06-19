Hardware Requirements
~~~~~~~~~~~~~~~~~~~~~

|mdb-edition| requires an x86 64-bit architecture. 

Software Requirements
~~~~~~~~~~~~~~~~~~~~~

Install on Windows 7 / Server 2008 R2 or Later
   |mdb-edition| requires Microsoft Windows Server 
   2008 R2 or later or Microsoft Windows 7 or later for the x86 64-bit
   architecture.

   To find which version, service pack, and build of Windows is  
   running on your host, as well as the processor type of that host, 
   enter the following command in either the :guilabel:`Command Prompt`
   or :guilabel:`Powershell`:

   .. code-block:: powershell

      systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"

   .. code-block:: powershell
      :copyable: false

      OS Name:                   Microsoft Windows 10 Pro
      OS Version:                10.0.17134 N/A Build 17134
      System Type:               x64-based PC

Show All File Name Extensions
   Make certain that you set Windows Explorer to show file name 
   extensions for all file types. This can prevent issues where the 
   file type displayed to the user differs from the actual file type.

   .. example::

      If Windows Explorer has known file extensions hidden, what may 
      appear to be ``mongod.cfg`` is actually ``mongod.cfg.txt``.

Install all Windows Updates
   Before installing MongoDB, update your Windows host with the latest 
   system updates. At minimum, ensure the following Windows updates 
   are installed on the host:

   - Windows 2012 Server and Windows 10 need 
     `KB2999226 <https://support.microsoft.com/en-us/help/2999226/update-for-universal-c-runtime-in-windows>`__ 
     to provide Universal C Runtime support for Windows.

   - Windows Server 2008 R2 and Windows 7 need 
     `KB2731284 <http://support.microsoft.com/kb/2731284>`__ to resolve
     an issue with memory mapped files on Windows.

The Windows installer (``.msi``) file includes all other
software dependencies and automatically upgrades any previous version 
of MongoDB that was installed using an ``.msi`` file.

Security
~~~~~~~~

.. include:: /includes/fact-default-bind-ip-change.rst

.. warning::

   Do not expose :binary:`~bin.mongod.exe` to a public network without 
   :docs:`configuring authentication </core/authentication>`. MongoDB 
   is designed to be run in trusted environments.
