.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Run the following commands in your shell to create a new
      directory and a file for your application. The command also
      installs the {+csharp-driver+}.

      .. code-block:: shell 

         mkdir csharp-quickstart
         cd csharp-quickstart
         dotnet new console
         dotnet add package MongoDB.Driver

   .. step:: Create your application

      Copy and paste the following code into the ``Program.cs`` file
      in your application:

      .. literalinclude:: /shared/drivers-get-started/csharp/get-started-connect.cs
         :language: csharp

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      From your project directory, run the following command to start
      the application:

      .. code-block:: shell

         dotnet run csharp-quickstart.csproj

      The application output contains details about the retrieved
      movie document:

      .. include:: /get-started/includes/application-output.rst