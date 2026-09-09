.. step:: Create your project and install dependencies.

   a. Run the following commands in your terminal to create a new
      directory named ``VectorQuantization`` and initialize your
      project:

      .. code-block:: shell

         dotnet new console -o VectorQuantization
         cd VectorQuantization

   #. Run the following command to add the :driver:`MongoDB .NET/C#
      Driver </csharp/current/>` to your project. You must install
      v3.2.0 or later.

      .. code-block:: shell

         dotnet add package MongoDB.Driver --version 3.2.0

.. step:: Set your environment variables.

   Export the following environment variables in your terminal, or
   use your IDE's environment variable manager to make these
   variables available to your project.

   .. code-block:: shell
      :caption: Environment variables

      export VOYAGE_API_KEY="<api-key>"
      export CONNECTION_STRING="<connection-string>"

   Update the placeholders with the following values:

   - Replace the ``<api-key>`` placeholder value with your |voyage|
     API key.
   - .. include:: /includes/shared/facts/find-connection-string.rst
