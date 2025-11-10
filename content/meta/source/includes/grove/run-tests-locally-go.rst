.. procedure::

   .. step:: Set up the local environment.

      If you have not already done so, refer to the instructions to
      :ref:`grove-set-up-environment`.

   .. step:: Run the tests.

      Most IDEs support running tests from within the IDE. Refer to your IDE's
      documentation for details. You can also run the tests from the command line.
      To do so, open a terminal window and navigate to the
      ``code-example-tests/go/driver/tests`` directory.

      Then, use one of these commands to run the tests:

      **Run all tests**

      Run the following command to run all tests:

      .. code-block:: bash

         go test -v -p 1 ./...

      **Run all the tests in a specific package**

      Run the following command to run all the tests in a single package.
      Replace ``./aggregation/package`` with the path from the ``tests``
      directory to the file that contains the tests you want to run.

      .. code-block:: bash

         go test -v -p 1 ./aggregation/pipelines


      **Run a specific test case within an example file**

      Run the following command to run a specific test case within an example
      file. Replace ``TestExampleOperations/YourExampleName`` with the name of
      the test function and test case you want to test:

      .. code-block:: bash

         go test -v ./... -run TestExampleOperations/YourExampleName

      For example, the following command runs the ``JoinOneToOneTutorial``
      test case within the ``TestAggregationPipelines`` test function:

      .. code-block:: bash

         go test -v ./... -run TestAggregationPipelines/JoinOneToOneTutorial

      .. tip::

         When you're working on a specific example, you can iterate more quickly
         by running only the tests for that example. When you're done, run all
         the tests to ensure you haven't introduced any state that causes other
         tests to fail.

Troubleshoot Failing Tests
--------------------------

If your tests are failing, these are a few common causes:

- Problems connecting to MongoDB.

  - Missing connection string: check that the ``.env`` file exists at the
    root of the ``go/driver`` directory and contains
    the ``CONNECTION_STRING`` environment variable.
  - Invalid connection string: check that the connection string in your ``.env``
    file is wrapped in quotes, and contains the correct value. For Atlas
    clusters, the connection string should use the format
    ``mongodb+srv://username:password@cluster0.mongodb.net/test?retryWrites=true&w=majority``.
    For local deployments, the connection string should use the format
    ``mongodb://localhost:27017/``.
  - Insufficient user permissions: check that the user you're using to connect
    has the correct permissions. For Atlas clusters, you may need to add the
    user to your project and grant them the appropriate roles. In order to drop
    the database, an Atlas user must have Atlas admin permissions - write
    permissions are not sufficient. This error resembles:

    ``MongoServerError: user is not allowed to do action [dropDatabase] on [<db_name>]``

  - Infrastructure issues: check that your Atlas cluster or local MongoDB
    deployment is running and accessible. If you use IP access restrictions,
    make sure your IP address is added to the access list. If you're running
    locally in Docker, check that your Docker container is running and exposes
    the port you use in your connection string.

- Tests run, but do not pass. This could be related to a few types of issues:

  - Shared state. You may have issues related to tests interacting with each
    other. To resolve these issues, refer to :ref:`grove-add-tests` and
    consult the section on avoiding carrying over test state. This may resemble:

    - The tests are not properly isolated from each other. For example, one test
      might change a field value, and another test might assume that field has a
      certain value.
    - The tests are not properly cleaning up after themselves. For example, one
      test might add a document to the database, but not remove it after the test
      runs.

  - The tests are not properly comparing the output. An exception is thrown when
    comparing output and the test fails.

    - Is the test looking for something specific in the output that may have
      changed? To resolve this issue, update the expected output file
      to match the new output.
    - Is the test attempting to compare an ObjectId, time stamp, or other
      dynamic value that may vary between test runs? Use the ``WithIgnoredFields()``
      option to omit any of these values when comparing results.
    - Are you using the correct comparison options? Refer to
      :ref:`grove-add-tests` and consult the section on output comparison for
      more information.
    - Are there path errors in output files? Make sure the path to the expected
      output file is correct. The path should start with ``examples``. For
      example, to reference the ``output.txt`` file in the
      ``aggregation/pipelines/join_one_to_one`` directory, use the following
      path:

      .. code-block:: go

         expectedFile := "examples/aggregation/pipelines/join_one_to_one/output.txt"

  - The tests have not loaded sample data.

    - If you are creating your own sample data, make sure you call the function
      that loads your sample data before the test runs.

    - If you are using MongoDB sample data sets, refer to the
      `Load Sample Data <https://www.mongodb.com/docs/atlas/sample-data/>`__
      documentation to learn how to set up sample data in your environment.

  - Missing or incorrect imports

    - Make sure your import path matches the project and directory structure.
      The Go Driver test project name is ``driver-examples``, so the import
      path for the ``examples`` directory is ``driver-examples/examples``.
      For example, to import the ``crud/insert`` example, you would use the
      following import statement:

      .. code-block:: go

         "driver-examples/examples/crud/insert"

      This import would fail:

      .. code-block:: go

         // Bad import - missing the project name. Should be `driver-examples/examples/crud/insert`
         "examples/crud/insert"
