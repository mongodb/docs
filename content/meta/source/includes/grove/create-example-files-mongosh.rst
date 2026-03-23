.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``code-example-tests/command-line/mongosh/examples``
      directory. Use subdirectories to group related concepts (for example,
      ``aggregation/pipelines/unwind`` or ``crud/insert``).

      Use kebab case for file and directory names. For example,
      ``aggregation/pipelines/join-one-to-one/load-data-orders.js``.

      .. tip:: Name based on concepts, not docs page structure.

         With the goal of single-sourcing code examples across different docs
         projects, avoid matching a specific docs project's page structure and
         instead group code examples by related concept or topic for easy reuse.

   .. step:: Add runnable mongosh code to your file.

      Add code that mongosh can execute directly. The test harness runs your file
      with ``mongosh --file`` and validates the output of the last expression.
      Do not add imports, connection logic, or wrapper functions—mongosh handles
      the connection.

      Single-operation Examples
      ~~~~~~~~~~~~~~~~~~~~~~~~~

      For a single command, add the mongosh code directly to a single file:

      .. code-block:: javascript

         db.myCollection.insertMany([
            { name: "John", age: 30 },
            { name: "Jane", age: 25 }
         ]);

      Multi-step Examples (Separate Files)
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      For operations that require a load step followed by a query (for example,
      load data then run a pipeline), create two separate files. The test runs them in
      order; only the last file's output is validated.

      .. code-block:: javascript
         :caption: load-data.js

         db.persons.insertMany( [
            {
               person_id: "6392529400",
               firstname: "Elise",
               lastname: "Smith",
               dateofbirth: new Date("1972-01-13T09:32:07Z"),
               vocation: "ENGINEER",
               address: {
                  number: 5625,
                  street: "Tipa Circle",
                  city: "Wojzinmoj",
               }
            },
            {
               person_id: "1723338115",
               firstname: "Olive",
               lastname: "Ranieri",
               dateofbirth: new Date("1985-05-12T23:14:30Z"),
               gender: "FEMALE",
               vocation: "ENGINEER",
               address: {
                  number: 9303,
                  street: "Mele Circle",
                  city: "Tobihbo",
               }
            }
         ] )

      .. code-block:: javascript
         :caption: run-pipeline.js

         db.persons.aggregate( [
            { $match: { "vocation": "ENGINEER" } },
            { $sort: { "dateofbirth": -1 } },
            { $limit: 3 },
            { $unset: [ "_id", "address"] }
         ] )

      Multi-step Examples (Single Concatenated File)
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      To combine load and query in one file for a single ``literalinclude``,
      use the comma operator. Wrap the sequence in parentheses so the last
      expression's output is captured for validation. Add Bluehawk snippet
      tags so writers can include the full example or individual steps. Refer to :ref:`grove-mark-up-examples` for details.

      .. code-block:: javascript

         // :snippet-start: full-example
         (
            // :snippet-start: load-step
            db.persons.insertMany([...])
            // :snippet-end:
            ,
            // :snippet-start: query-step
            db.persons.aggregate([...])
            // :snippet-end:
         )
         // :snippet-end:

   .. step:: Optional: Add snippet markup.

      Use ``:snippet-start: <name>`` and ``:snippet-end:`` to extract
      portions of your file for docs. The snip script produces
      ``<filename>.snippet.<name>.js`` files that writers reference with
      ``literalinclude``. 
      
      Refer to :ref:`grove-mark-up-examples` for details.

   .. step:: Create an expected output file.

      Create an expected output file for every example. The mongosh test harness
      validates code by comparing actual output to this file. You must include
      an output file even if you do not intend to show it in the docs.

      Save it alongside your example file with a name that includes ``output``.
      For example, ``aggregation/pipelines/unwind/output.sh``.

      The file should contain the output you expect when the last expression
      in your example runs. Grove uses a comparison library to match the actual
      output against this file.

      You can use ellipses to truncate long output blocks. The comparison
      library recognizes specific ellipsis patterns and can match truncated
      output. Refer to :ref:`grove-truncate-long-strings` for details.
