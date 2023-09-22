
On most Linux operating systems, control the TCP retransmission
by adjusting the ``net.ipv4.tcp_retries2`` sysctl setting.

.. note:: 

   Although the setting name includes ``ipv4``, the ``tcp_retries2`` setting
   applies to both IPv4 and IPv6.

- To view the current setting, use the ``sysctl`` command:

  .. io-code-block::

     .. input::
        :language: bash

        sysctl net.ipv4.tcp_retries2

     .. output::
        :language: bash

        net.ipv4.tcp_retries = 15

- To change the ``tcp_retries2`` setting at runtime, use the ``sysctl`` command:

  .. code-block:: bash

     sysctl -w net.ipv4.tcp_retries2=8

- To make the change permanent, edit the configuration file:

  #. Open ``/etc/sysctl.conf`` in your preferred text editor:

     .. code-block:: bash

        vi /etc/sysctl.conf

  #. Configure the ``net.ipv4.tcp_retries2`` setting:

     .. code-block:: conf

        net.ipv4.tcp_retries2 = 8

  #. Restart the system. 
  
  Your system now uses the new ``tcp_retries2`` setting.

