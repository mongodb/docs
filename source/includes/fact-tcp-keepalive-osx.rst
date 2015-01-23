For OS X systems, issue the following command to view the keep alive
setting:

.. code-block:: sh

   sysctl net.inet.tcp.keepinit

To set a shorter keep alive period use the following invocation:

.. code-block:: sh

   sysctl -w net.inet.tcp.keepinit=<value>

