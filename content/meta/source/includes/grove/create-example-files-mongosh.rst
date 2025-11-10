.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``command-line/mongosh/examples`` directory, or
      within a subdirectory to organize these examples to group related concepts.
      For example, you might create a file for an aggregation pipeline unwind
      tutorial in ``/aggregation/pipelines/unwind``, or a file for an insert
      example in ``/crud/insert``.

      With the goal of single-sourcing code examples across different docs
      projects, avoid matching a specific docs project's page structure and
      instead group code examples by related concept or topic for easy reuse.

      For file and directory names, use kebab case. For example,
      ``aggregation/pipelines/join-one-to-one/load-data-orders.js``.

   .. step:: Add the example code to your file.

      Add the example code to your file. For most cases, this is a single
      block of code that can be executed in mongosh. For example:

      .. code-block:: javascript

         db.myCollection.insertMany([
            { name: "John", age: 30 },
            { name: "Jane", age: 25 }
         ]);

      If you want to show multiple mongosh commands, add each command to a
      separate file. For example, for an aggregation page, you might create
      ``load-data.js`` and ``run-pipeline.js`` with the following code:

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

      And:

      .. code-block:: javascript
         :caption: run-pipeline.js

         db.persons.aggregate( [
            // Stage 1: Match documents of people who are engineers
            { $match: { "vocation": "ENGINEER" } },

            // Stage 2: Sort documents from youngest to oldest
            { $sort: { "dateofbirth": -1 } },

            // Stage 3: Limit the results to 3 documents
            { $limit: 3 },

            // Stage 4: Remove unneeded fields
            { $unset: [ "_id", "address"] }
         ] )

   .. step:: Create an expected output file.

      If you want to show the output of your example in the docs, create an
      expected output file. This file should contain the output that you
      want to show in the docs.

      Save it alongside your example file, and give it a name that includes
      ``output``. For example,
      ``aggregation/pipelines/unwind/output.sh``.

      Grove uses a comparison library to compare the output from your
      expected output file with the actual output from running your mongosh
      code example files.

      You can use ellipses to truncate long output blocks. The comparison
      library recognizes specific ellipsis patterns and can match truncated
      output. Refer to :ref:`grove-truncate-long-strings` for details.
