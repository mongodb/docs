**For OS X systems**:

- To view the keep alive setting, issue the following command:

  .. code-block:: sh

     sysctl net.inet.tcp.keepinit

- To change the ``net.inet.tcp.keepinit`` value, you can use the
  following command:

  .. code-block:: sh

     sysctl -w net.inet.tcp.keepinit=<value>

  The above method for setting the TCP keepalive is not persistent; you
  will need to reset the value each time you reboot or restart a
  system. See your operating system’s documentation for instructions on
  setting the TCP keepalive value persistently.
