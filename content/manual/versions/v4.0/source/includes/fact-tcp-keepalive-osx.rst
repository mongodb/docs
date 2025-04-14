- To view the keepalive setting on macOS, issue the following command:

  .. code-block:: sh

     sysctl net.inet.tcp.keepidle

  The value is measured in milliseconds.

  |

- To change the ``net.inet.tcp.keepidle`` value, you can use the
  following command, supplying a *<value>* in milliseconds:

  .. code-block:: sh

     sudo sysctl net.inet.tcp.keepidle=<value>

  This operation does not persist across system reboots, and must be
  set each time your system reboots. See your operating system's
  documentation for instructions on setting this value persistently.
  Keepalive values greater than or equal to ``600000`` milliseconds
  (10 minutes) will be ignored by :binary:`~bin.mongod` and
  :binary:`~bin.mongos`.

  .. note::

     In macOS 10.15 Catalina, Apple no longer allows for configuration
     of the ``net.inet.tcp.keepidle`` option.
