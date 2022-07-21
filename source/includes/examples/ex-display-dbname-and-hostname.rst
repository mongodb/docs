The current database name is part of the default ``mongosh`` prompt. To
reformat the prompt to show the database and hostname, use a function
like this one:

.. code-block:: javascript

   {
      const hostnameSymbol = Symbol('hostname');
      prompt = () => {
         if (!db[hostnameSymbol]) 
            db[hostnameSymbol] = db.serverStatus().host;
         return `${db.getName()}@${db[hostnameSymbol]}> `;
      };
   }

The prompt will look like this:

.. code-block:: javascript

   admin@centos0722:27502> 

