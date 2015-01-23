On Linux systems you can use the following operation to check the
value of ``tcp_keepalive_time``:

.. code-block:: sh

   cat /proc/sys/net/ipv4/tcp_keepalive_time

The value is measured in seconds. You can change the
``tcp_keepalive_time`` value with the following operation:

.. code-block:: sh

   echo <value> > /proc/sys/net/ipv4/tcp_keepalive_time

