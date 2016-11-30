**For Windows systems**:

- To view the keep alive setting, issue the following command:

  .. code-block:: powershell

     reg query HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters /v KeepAliveTime

  The registry value is not present by default. The system default,
  used if the value is absent, is 7200000 *milliseconds* or
  ``0x6ddd00`` in hexadecimal.

- To change the ``KeepAliveTime`` value, use the following command in
  an Administrator :guilabel:`Command Prompt`, where ``<value>`` is
  expressed in hexadecimal (e.g. 120000 is ``0x1d4c0``):

  .. code-block:: powershell

     reg add HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\ /v KeepAliveTime /d <value>

  Windows users should consider the `Windows Server Technet Article on
  KeepAliveTime
  <https://technet.microsoft.com/en-us/library/cc957549.aspx>`_ for
  more information on setting keep alive for MongoDB deployments on
  Windows systems.
