**On Linux systems**:

- To view the keep alive setting, issue the following command:

  .. code-block:: sh

     cat /proc/sys/net/ipv4/tcp_keepalive_time

  The value is measured in seconds.

- To change the ``tcp_keepalive_time`` value, you can use the
  following command:

  .. code-block:: sh

     echo <value> > /proc/sys/net/ipv4/tcp_keepalive_time

  On Linux, :program:`mongod` and :program:`mongos` processes limit the
  keepalive to a maximum of 300 seconds (5 minutes) on their own
  sockets by overriding keepalive values greater than 5 minutes.

  The above method for setting the TCP keepalive is not persistent; you
  will need to reset the value each time you reboot or restart a
  system. See your operating system’s documentation for instructions on
  setting the TCP keepalive value persistently.
