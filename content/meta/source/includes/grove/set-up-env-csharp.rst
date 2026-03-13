.. procedure::
   :style: normal

   .. step:: Install the .NET Framework.

      The C# Driver test suite requires .NET version 10.0 or later.

      To learn how to install .NET, refer to
      `Install .NET on Windows, Linux, and macOS <https://learn.microsoft.com/en-us/dotnet/core/install/>`__
      and select your OS for installation instructions and download links.

   .. step:: Install Bluehawk.

      Grove uses `Bluehawk <https://github.com/mongodb-university/Bluehawk>`__
      to extract code from example files. If you do not already have it
      installed, run the following command to install Bluehawk:

      .. code-block:: console

         npm install -g bluehawk

   .. step:: Install project dependencies.

      .. tip::

         We recommend opening the ``code-example-tests/csharp/driver``
         directory as the root of your IDE to get intelligent hints about
         deprecated Driver APIs and code correctness.

      From the root of the ``code-example-tests/csharp/driver`` directory,
      run the following command to install the project dependencies:

      .. code-block:: console

         dotnet build


   .. step:: Create a MongoDB cluster or local deployment.

      You need a MongoDB cluster or local deployment to run the tests. If you
      do not already have a cluster or local deployment, create one now.

      For details on how to create a deployment, refer to the
      `Get Started <https://www.mongodb.com/docs/get-started/?language=nodejs>`__
      documentation.

      When you run tests locally, you run them against the cluster or local
      environment you set up. When you make a pull request, the tests run in CI
      using a fresh GitHub environment for every pull request and test run.

      .. tip:: Required Atlas permissions or valid port

         If you use an Atlas cluster for testing, the user you use to connect to
         the cluster must have Atlas admin permissions. Write permissions are
         not sufficient to drop the database, which the tests do as part of
         their teardown.

         If you use a local deployment, a user is not required, but you must
         ensure that the port you use is open and accessible.

   .. _grove-set-up-env-csharp:

   .. step:: Create a .env file.

      Grove reads the MongoDB connection string and other relevant details for
      your test environment from an ``.env`` file. Create a file named ``.env``
      at the root of the ``code-example-tests/csharp/driver`` directory.
      Add the following environment variables:

      .. code-block:: text
         :caption: .env

         CONNECTION_STRING="<your-connection-string>"
         SOLUTION_ROOT="/Users/your-username/workspace/docs-mongodb-internal/code-example-tests/csharp/driver/"

      - ``CONNECTION_STRING``: Replace the ``<your-connection-string>`` placeholder
        with the connection string from the Atlas cluster or local deployment you
        created in the prior step.

      - ``SOLUTION_ROOT``: Provide the absolute path to the ``driver`` directory on
        your filesystem.


      .. important:: Do Not Commit the .env File

         The ``.env`` file is ignored in the repository's ``.gitignore`` file.
         This is a local file for your machine only. By using the ``.env`` file,
         you can safely store your connection string and other sensitive
         information without committing it to the repository. The GitHub
         workflow that runs the test suite has its own connection string for
         testing. Other writers use their own connection strings in their
         own ``.env`` files when they run the test suite locally.

   .. step:: (Optional) Load MongoDB sample data sets.

      If your examples use the MongoDB sample data sets, load them to
      your cluster or local deployment. For details on how to load the sample
      data sets, refer to the `Load Sample Data <https://www.mongodb.com/docs/atlas/sample-data/>`__
      documentation.