.. procedure::

   .. step:: Set up the local environment.

      If you have not already done so, refer to the instructions to
      :ref:`grove-set-up-environment`.

   .. step:: Run the tests.

      Most IDEs support running tests from within the IDE. Refer to your IDE's
      documentation for details. You can also run the tests from the command line. 
      To do so, open a terminal window and navigate to the 
      ``code-example-tests/csharp/driver`` directory.

      Then, use one of these commands to run the tests:

      **Run all tests**

      Run the following command to run all tests:

      .. code-block:: bash

         dotnet test Tests/Tests.csproj

      **Run all the tests in a specific class**

      Run the following command to run all the tests in a single class.
      Replace ``<MyNamespace.MyClass>`` with the fully qualified name of the class
      that contains the tests you want to run. The fully qualified name includes
      the namespace, class name, and any nested class names. 

      .. code-block:: bash

         dotnet test --filter "FullyQualifiedName~<Namespace.ClassName>"
         

      **Run a specific test case within an example file**

      Run the following command to run a specific test case within an example
      file. Replace ``MyNamespace.MyClass.MyTestMethod`` with fully qualified name 
      of the class and method you want to test:

      .. code-block:: bash

         dotnet test --filter "FullyQualifiedName~MyNamespace.MyClass.MyTestMethod"

      For example, the following command runs the ``TestUnwind`` test method within 
      the ``Aggregation`` class in the ``Tutorials`` namespace:

      .. code-block:: bash

         dotnet test --filter "FullyQualifiedName~Tutorials.Aggregation.TestUnwind"

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
    root of the ``csharp/driver`` directory and contains
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

  - The tests have not loaded sample data. 
  
    - If you are creating your own sample data, make sure you call the function
      that loads your sample data before the test runs. 
    
    - Your ``.env`` file might be missing the ``SOLUTION_ROOT`` environment 
      variable.  Make sure your ``.env`` file exists at the root of the 
      ``csharp/driver`` directory and contains the ``SOLUTION_ROOT`` environment 
      variable with an absolute path.
      
    - If you are using MongoDB sample data sets, refer to the
      `Load Sample Data <https://www.mongodb.com/docs/atlas/sample-data/>`__
      documentation to learn how to set up sample data in your environment.
