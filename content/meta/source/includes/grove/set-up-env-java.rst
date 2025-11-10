.. procedure::
   :style: normal

   .. step:: Install a JDK and Maven

      The Java Driver test suites require you to have the following prerequisites
      installed:

      - `Java Development Kit (JDK) <https://docs.oracle.com/en/java/javase/21/install/overview-jdk-installation.html>`__
      - `Apache Maven <https://maven.apache.org/install.html>`__

   .. step:: Install Bluehawk.

      Grove uses `Bluehawk <https://github.com/mongodb-university/Bluehawk>`__
      to extract code from example files. If you do not already have it
      installed, run the following command to install Bluehawk:

      .. code-block:: console

         npm install -g bluehawk

   .. step:: Build the projects.

      From the root of the ``code-example-tests/java`` directory,
      run the following command to build the projects:

      .. code-block:: console

         mvn clean install -DskipTests

      Note you run this from the root of the ``java`` directory, not the
      ``driver-sync`` or ``driver-reactive`` directories. The Java project
      is configured as a Maven Multi-Module project, so you must run the
      build from the root directory.

   .. step:: Open the relevant Driver project in your IDE.

      After the first-time setup to compile the project, we recommend
      opening the relevant Driver project as the root of your IDE to get
      intelligent hints about deprecated Driver APIs and code correctness.

      For the synchronous Driver, open the ``code-example-tests/java/driver-sync``
      directory as the root of your IDE. For the reactive Driver, open the
      ``code-example-tests/java/driver-reactive`` directory as the root of
      your IDE.

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

   .. _grove-set-up-env-java:

   .. step:: Set environment variables.

      Grove reads the MongoDB connection string and other relevant details for
      your test environment from the environment. Create environment variables
      to use when running the tests. Depending on how you run the tests, you
      may do this in a few ways:

      - Set them in your system through the terminal
      - Add them in the IDE

      The Java test suites require the following environment variable:

      - ``CONNECTION_STRING``: your Atlas or local connection string.

      a. **Add them to your process through the terminal**

         You can manually set these environment values through the terminal
         using the export command:

         .. code-block:: console

            export CONNECTION_STRING="<your-connection-string>"

         This is how we set the environment variables in CI. This sets the
         environment variables system-wide. After you restart your computer,
         you will need to run the export command again.

      b. **Add them in the IDE**

         You can set the environment variables in a run configuration in your
         IDE. Refer to your IDE's instructions for how to do this. The IDE will
         then set the environment variables for you when you run the tests.

   .. step:: (Optional) Load MongoDB sample data sets.

      If your examples use the MongoDB sample data sets, load them to
      your cluster or local deployment. For details on how to load the sample
      data sets, refer to the `Load Sample Data <https://www.mongodb.com/docs/atlas/sample-data/>`__
      documentation.
