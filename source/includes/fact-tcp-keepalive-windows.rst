For Windows systems, issue the following command to view the keep alive
setting:

.. code-block:: powershell

   reg query HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters /v KeepAliveTime

The registry value is not present by default. The system default used
if the value is absent, is 7200000 *milliseconds*, or ``0x6ddd00`` in
hexadecimal. To set a shorter keep alive period use the following
invocation in an Administrator :guilabel:`Command Prompt`, where
``<value>`` is expressed in hexadecimal (e.g. ``0x0124c0`` is 120000):

.. code-block:: powershell

   reg add HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\ /v KeepAliveTime /d <value>

Windows users should consider the `Windows Server Technet Article on
KeepAliveTime
<https://technet.microsoft.com/en-us/library/cc957549.aspx>`_
for more information on setting keep alive for MongoDB deployments on
Windows systems.
