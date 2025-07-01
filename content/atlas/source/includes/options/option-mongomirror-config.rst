.. option:: --config=<file>

   |yaml| file that stores options and values for ``mongomirror``. Specify the file using relative or absolute paths to run ``mongomirror`` with the options that the file contains.

   The config file supports the following options:

   - :option:`password <--password>` <password>
   - :option:`sslPEMKeyPassword <--sslPEMKeyPassword>` <password>
   - :option:`destinationPassword <--destinationPassword>` <password>
   - ``uri`` <source cluster :manual:`URI connection string 
     </reference/connection-string>`>

   Specify options in the config file using the ``option: value``
   syntax. Don't include ``--`` before options in the config file. If
   you set an option in the configuration file, you don't need to
   specify that option within the ``mongomirror`` command. 
   
   .. example::
      
      Create a config file called ``myconfig.yaml`` that contains the following:
      
      .. code-block::

         password: <passwordForUser>
         destinationPassword: <passwordForDestinationUser>

      You can run ``mongomirror`` without including the ``--password`` and ``--destinationPassword`` flags:

      .. code-block::

         mongomirror --host <sourceReplSet> \
            --ssl \
            --username <atlasAdminUser> \
            --destinationUsername <atlasAdminUser> \
            --config=myconfig.yaml \
            --destination <atlasCluster> \
            [Additional options]
   

