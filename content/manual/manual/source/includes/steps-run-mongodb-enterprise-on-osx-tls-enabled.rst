To run MongoDB Enterprise Edition with
:ref:`TLS connections <transport-encryption>` enabled, you can choose
one of the following methods:

.. procedure::
    :style: normal

    .. step:: Run :binary:`~bin.mongod` with command-line parameters

      To run MongoDB Enterprise Edition as a background process, specify the ``dbpath``, ``logpath``, and ``fork`` options:
        
      .. code-block:: sh

        mongod --dbpath ~/data/db --logpath ~/data/log/mongodb/mongo.log --fork
  
    .. step:: Run :binary:`~bin.mongod` with a configuration file

      Alternatively, you can store the values
      for ``dbpath``, ``logpath``, ``fork`` in a
      :ref:`configuration file <configuration-options>`.     
        
      Run the :binary:`~bin.mongod` process at the command line,
      providing the path to a
      :ref:`configuration file <configuration-options>`
      with the ``config`` parameter:
        
      .. code-block:: sh
        
        mongod --config /usr/local/etc/mongod.conf
