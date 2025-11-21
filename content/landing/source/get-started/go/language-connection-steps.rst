.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Run the following commands in your shell to create a new
      directory and initialize a Go application. The command also
      installs the {+go-driver+}.

      .. tabs::

         .. tab:: macOS
            :tabId: macos

            .. code-block:: shell

               mkdir go-quickstart
               cd go-quickstart
               go mod init go-quickstart
               go get go.mongodb.org/mongo-driver/v2/mongo
               touch main.go

         .. tab:: Windows
            :tabId: windows

            .. code-block:: shell

               mkdir go-quickstart
               cd go-quickstart
               go mod init go-quickstart
               go get go.mongodb.org/mongo-driver/v2/mongo
               type nul > main.go

   .. step:: Create your application

      Copy and paste the following code into your ``main.go`` file. This code
      connects to your cluster and queries your sample data.

      .. literalinclude:: /shared/drivers-get-started/go/get-started-connect.go
         :language: go

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      In your project directory, run the following command to start
      the application:

      .. code-block:: shell

         go run main.go

      .. include:: /get-started/includes/application-output.rst
