.. procedure::
   :style: normal

   .. step:: **Required**. Set the environment variables.

      To set the environment variables for use in the subsequent steps
      in this procedure, copy the following, set the values for the
      environment variables, and then run the commands in your terminal:

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/env_variables.sh
         :language: shell
         :copyable: true
         :linenos:

      Note that these environment variables are only available in
      the current terminal session and will need to be set again in any
      new terminal sessions.

   .. step:: Optional. Verify the environment variables.

      To verify the environment variables, copy and run the following
      command in your terminal:

      .. literalinclude:: /includes/code-examples/search/07-search-external-sharded-mongod-managed-lb/code_snippets/07_0040_validate_env.sh
         :language: shell
         :copyable: true
         :linenos: