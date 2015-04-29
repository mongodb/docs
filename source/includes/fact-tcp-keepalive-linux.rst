On Linux systems you can use the following operation to check the
value of ``tcp_keepalive_time``:

.. code-block:: sh

   sysctl net.ipv4.tcp_keepalive_time

Or the following:

.. code-block:: sh

   cat /proc/sys/net/ipv4/tcp_keepalive_time

The value is measured in seconds. You can change the
``tcp_keepalive_time`` value with the following operation:

.. code-block:: sh

   sudo sysctl -w net.ipv4.tcp_keepalive_time=<value>

Or the following:

.. code-block:: sh

   echo <value> | sudo tee /proc/sys/net/ipv4/tcp_keepalive_time

This does not persist across system reboots. To do so, add the
following line to ``/etc/sysctl.conf``:

.. code-block:: sh

   net.ipv4.tcp_keepalive_time = <value>

