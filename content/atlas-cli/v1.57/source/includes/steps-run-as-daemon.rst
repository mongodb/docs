.. procedure::
   :style: normal

   .. step:: Start the daemon.

      Run the following command to start the daemon:

      .. code-block::

         docker run -d --name mongodb/atlas mongodb/atlas

   .. step:: Get a shell.

      Run the following command to get a shell with an environment file:
      
      .. code-block:: 
          
         docker exec --env-file atlas.env --rm -it mongodb/atlas bash

   .. step:: Authenticate and run {+atlas-cli+} commands.

      .. note::

         You must have access to the GitHub API in order to use the Atlas CLI in Docker.

      To authenticate and run commands, set up API keys in the `environment file 
      <https://docs.docker.com/engine/reference/commandline/run/#env>`__. 
      To learn more, see 
      :ref:`{+atlas-cli+} environment variables <atlas-cli-env-vars>`.

      After you set up API keys, you can run {+atlas-cli+} commands by
      adding
      ``docker exec --env-file ./atlas.env --rm mongodb/atlas`` before
      each {+atlas-cli+} command. For example, to run the 
      :ref:`atlas --help <atlas>` command with an environment
      file, run the following command, replacing ``atlas.env`` with the
      name of the environment file:

      .. code-block::

         docker exec --env-file ./atlas.env --rm mongodb/atlas atlas --help
