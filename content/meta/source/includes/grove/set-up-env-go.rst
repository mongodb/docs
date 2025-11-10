.. procedure::
   :style: normal

   .. step:: Install Go and Dependencies

      The Go Driver test suite requires you to have Go v1.24.5 or newer installed.

      If you do not yet have Go installed, refer to the
      `Go installation page <https://go.dev/doc/install>`__
      for details. We recommend using a Go version manager like
      `g <https://github.com/stefanmaric/g>`__ to manage your Go versions.

      With Go installed, run the following command from the root of the
      ``code-example-tests/go/driver`` directory to install dependencies:

      .. code-block:: console

         go mod download

   .. step:: Install Bluehawk.

      Grove uses `Bluehawk <https://github.com/mongodb-university/Bluehawk>`__
      to extract code from example files. If you do not already have it
      installed, run the following command to install Bluehawk:

      .. code-block:: console

         npm install -g bluehawk

   .. step:: Open the Driver project in your IDE.

      We recommend opening the relevant Driver project as the root of your IDE
      to get intelligent hints about deprecated Driver APIs and code correctness.

      For Go Driver, open the ``code-example-tests/go/driver``
      directory as the root of your IDE.

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

   .. _grove-set-up-env-go:

   .. step:: Create a .env file.

      Grove reads the MongoDB connection string and other relevant details for
      your test environment from a ``.env`` file. Create a file named ``.env``
      at the root of the ``code-example-tests/go/driver`` directory.
      Add the following environment variables:

      .. code-block:: text
         :caption: .env

         CONNECTION_STRING="<your-connection-string>"

      - ``CONNECTION_STRING``: Replace the ``<your-connection-string>`` placeholder
        with the connection string from the Atlas cluster or local deployment you
        created in the prior step.

   .. step:: (Optional) Load MongoDB sample data sets.

      If your examples use the MongoDB sample data sets, load them to
      your cluster or local deployment. For details on how to load the sample
      data sets, refer to the `Load Sample Data <https://www.mongodb.com/docs/atlas/sample-data/>`__
      documentation.
