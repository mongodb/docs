**On Linux systems**:

- To view the keep alive setting, you can use one of the following
  commands:

  .. code-block:: sh

     sysctl net.ipv4.tcp_keepalive_time

  Or:

  .. code-block:: sh

     cat /proc/sys/net/ipv4/tcp_keepalive_time

  The value is measured in seconds.

- To change the ``tcp_keepalive_time`` value, you can use one of the
  following command:

  .. code-block:: sh

     sudo sysctl -w net.ipv4.tcp_keepalive_time=<value>

  Or:

  .. code-block:: sh

     echo <value> | sudo tee /proc/sys/net/ipv4/tcp_keepalive_time

  These operations do not persist across system reboots. To persist the
  setting, add the following line to ``/etc/sysctl.conf``:

  .. code-block:: sh

     net.ipv4.tcp_keepalive_time = <value>

  On Linux, :program:`mongod` and :program:`mongos` processes limit the
  keepalive to a maximum of 300 seconds (5 minutes) on their own
  sockets by overriding keepalive values greater than 5 minutes.
