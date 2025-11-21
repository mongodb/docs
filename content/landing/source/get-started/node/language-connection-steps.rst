.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Run the following commands in your terminal to create a new
      directory and a file for your application. The command also
      initializes ``npm`` in the directory and installs the {+node-driver+}.

      .. tabs::

         .. tab:: macOS
            :tabId: macos

            .. code-block:: shell

               mkdir node-quickstart
               cd node-quickstart
               touch index.js
               npm init -y
               npm install mongodb

         .. tab:: Windows
            :tabId: windows

            .. code-block:: shell

               mkdir node-quickstart
               cd node-quickstart
               type nul > index.js
               npm init -y
               npm install mongodb

   .. step:: Create your application

      Copy and paste the following code into ``index.js``. This code
      connects to your cluster and queries your sample data.

      .. literalinclude:: /code-examples/tested/javascript/driver/get-started/get-started.snippet.example.js
         :language: javascript
         
   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      In your project directory, run the following command to start
      the application:

      .. code-block:: shell

         node index.js

      The application output contains details about the retrieved
      movie document:

      .. include:: /get-started/includes/application-output.rst
