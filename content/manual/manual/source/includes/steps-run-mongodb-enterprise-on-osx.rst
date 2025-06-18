.. procedure:: 
  :style: normal

  .. step:: Create the data directory. 

    Before you start MongoDB for the first time, you must create the  
    directory where the :binary:`~bin.mongod` process will write data.  
  
    For example, to create the ``~/data/db`` directory:  
  
    .. code-block:: sh  

       sudo mkdir -p ~/data/db  
  
  .. step:: Create the log directory.  

    You must also create the directory where the :binary:`~bin.mongod`  
    process will write its log file.  
  
    For example, to create the ``~/data/log/mongodb`` directory:  
  
    .. code-block:: sh  

       sudo mkdir -p ~/data/log/mongodb  
  
  .. step:: Set permissions for the data and log directories.  

    Ensure that the user account running :binary:`~bin.mongod` has read  
    and write permissions for these two directories. If you are running  
    :binary:`~bin.mongod` as your own user account, and you just created  
    the two directories above, they should already be accessible to your  
    user. Otherwise, you can use ``chown`` to set ownership, substituting  
    the appropriate *user*:  
  
    .. code-block:: sh  

       sudo chown <user> ~/data/db  
       sudo chown <user> ~/data/log/mongodb  
  
  .. step:: Run MongoDB. 

    The steps to run MongoDB Enterprise Edition depends on whether you  
    have :ref:`TLS connections <transport-encryption>` enabled or not.  
  
    .. tabs::  

       .. tab:: TLS Enabled  
          :tabid: tls-enabled  
            
          .. include:: /includes/steps-run-mongodb-enterprise-on-osx-tls-enabled.rst 

       .. tab:: TLS Disabled  
          :tabid: tls-disabled  
            
          .. include:: /includes/steps-run-mongodb-enterprise-on-osx-tls-disabled.rst  
  
  .. step:: Verify that MongoDB has started successfully.  

    To verify that :binary:`~bin.mongod`
    started successfully, run the following command and check the process list for a  
    :binary:`~bin.mongod` process:
  
    .. code-block:: sh  

       ps aux | grep -v grep | grep mongod  
  
    If you do not see a ``mongod`` process running, check the log file for  
    any error messages.  
  
  .. step:: Begin using MongoDB. 

    Start a :binary:`~bin.mongosh` session on the same host machine as the  
    :binary:`~bin.mongod`. You can run :binary:`~bin.mongosh`  
    without any command-line options to connect to a  
    :binary:`~bin.mongod` that is running on your *localhost* with the  
    default port of *27017*:  
  
    .. code-block:: sh  
      
       mongosh  
  
    For more information on connecting using :binary:`~bin.mongosh`,  
    such as to connect to a :binary:`~bin.mongod` instance running  
    on a different host and/or port, see the  
    :mongosh:`mongosh documentation </>`.  
  
    To help you start using MongoDB, MongoDB provides :ref:`Getting  
    Started Guides <getting-started>` in various driver editions. See  
    :ref:`getting-started` for the available editions.  
