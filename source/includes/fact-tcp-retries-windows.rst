On Windows, control TCP Retransmission by adjusting the 
``TcpMaxDataRetransmissions`` parameter.

- To view the ``TcpMaxDataRetransmissions`` setting on Windows, issue the 
  following command:

  .. code-block:: powershell

     reg query HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters /v TcpMaxDataRetransmissions

  By default, the parameter is not set. The system default,
  used if the value is absent, is ``5`` retries.

- To change the ``TcpMaxDataRetransmissions`` value, use the following command 
  in an Administrator :guilabel:`Command Prompt`, where ``<value>`` is an integer: 

  .. code-block:: powershell

     reg add HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\ /t REG_DWORD /v TcpMaxDataRetransmission /d <value>

