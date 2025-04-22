.. TODO: requires code review from driver teams

.. tabs-drivers::

   .. tab::
     :tabid: nodejs

     .. literalinclude:: /includes/queryable-encryption/automatic-enc-options/code-snippets/opts.js
         :language: javascript

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/queryable-encryption/automatic-enc-options/code-snippets/opts-shell.js
         :language: javascript

      .. tip:: Environment Variables

         If possible, consider defining the credentials provided in
         ``kmsProviders`` as environment variables, and then passing them
         to :binary:`~bin.mongosh` using the :option:`--eval
         <mongosh --eval>` option. This minimizes the chances of credentials
         leaking into logs.
