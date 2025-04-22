- To view the keepalive setting on Linux, use one of the following
  commands:

  .. container::

     .. code-block:: sh

        sysctl net.ipv4.tcp_keepalive_time

     Or:

     .. code-block:: sh

        cat /proc/sys/net/ipv4/tcp_keepalive_time

     The value is measured in seconds.

     .. note::

        Although the setting name includes ``ipv4``, the
        ``tcp_keepalive_time`` value applies to both IPv4 and IPv6.

- To change the ``tcp_keepalive_time`` value, you can use one of the
  following commands, supplying a *<value>* in seconds:

  .. container::

     .. code-block:: sh

        sudo sysctl -w net.ipv4.tcp_keepalive_time=<value>

     Or:

     .. code-block:: sh

        echo <value> | sudo tee /proc/sys/net/ipv4/tcp_keepalive_time

     These operations do not persist across system reboots. To persist
     the setting, add the following line to ``/etc/sysctl.conf``,
     supplying a *<value>* in seconds, and reboot the machine:

     .. code-block:: sh

        net.ipv4.tcp_keepalive_time = <value>

     Keepalive values greater than ``300`` seconds,
     (5 minutes) will be overridden on :binary:`~bin.mongod` and
     :binary:`~bin.mongos` sockets and set to ``300`` seconds.
