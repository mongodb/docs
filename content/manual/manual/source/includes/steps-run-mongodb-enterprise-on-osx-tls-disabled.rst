To run MongoDB Enterprise Edition without
:ref:`TLS connections <transport-encryption>` enabled,
use :ref:`GNU Screen <https://www.gnu.org/software/screen/>`, and follow 
these steps:


.. procedure:: 
  :style: normal
  
  .. step:: Start your screen

    .. code-block:: sh

      screen -S <name-of-screen>


  .. step:: Start :binary:`~bin.mongod`

    .. code-block:: sh

      mongod --config /opt/homebrew/etc/mongod.conf

  .. step:: Detach from the screen session

    To detach from the screen session, press ``Ctrl-a`` followed by ``d``.


  .. step:: View all active screen

    .. code-block:: sh

      screen -ls
