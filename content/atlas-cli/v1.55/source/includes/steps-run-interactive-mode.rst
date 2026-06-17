.. procedure::
   :style: normal

   .. step:: Get a shell.

      Run the command to get a shell in interactive mode.
      
      Without an Environment File
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~

      To get a shell without an environment file, run the
      following command:
    
      .. code-block:: 
          
         docker run --rm -it mongodb/atlas bash

      With an Environment File
      ~~~~~~~~~~~~~~~~~~~~~~~~

      To get a shell using an environment file, run the following
      command, replacing ``atlas.env`` with the name of the environment
      file:

      .. code-block::

         docker run --env-file atlas.env --rm -it mongodb/atlas bash

   .. step:: Authenticate and run {+atlas-cli+} commands.

      .. note::

         You must have access to the GitHub API in order to use the Atlas CLI in Docker.

      To authenticate and run commands, set up API keys in the `environment file 
      <https://docs.docker.com/engine/reference/commandline/run/#env>`__. 
      To learn more, see 
      :ref:`{+atlas-cli+} environment variables <atlas-cli-env-vars>`.
      
      To authenticate without an environment file, you can run 
      :ref:`atlas auth login <atlas-auth-login>` to authenticate: 

      .. code-block::

         atlas auth login
      
      After you authenticate, you can run Atlas CLI commands. For
      example, you can run :ref:`atlas --help <atlas>` to learn about
      available commands:

      .. code-block::

         atlas --help
