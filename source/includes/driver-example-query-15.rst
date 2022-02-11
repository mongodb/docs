.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. code-block:: javascript

            myCursor = db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:
     
         .. code-block:: javascript

            { size: { h: 14, w: 21, uom: "cm" } }

     - id: python
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15


     - id: go
       content: |
         .. literalinclude:: /includes/examples/curl_examples/examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: motor
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

         For completeness, this is how you might wrap this call and run
         it with the asyncio event loop.

         .. code-block:: python

            async def do_retrieve_embedded():
                cursor = db.inventory.find(
                {"size": SON([("h", 14), ("w", 21), ("uom", "cm")])})
                async for doc in cursor:
                    pprint.pprint(doc)
   
            loop = asyncio.get_event_loop()
            loop.run_until_complete(do_retrieve_embedded())

     - id: java-sync
       content: |

         First you will need to create the MongoCollection object you would like to query against.

         .. code-block:: java

            MongoCollection<Document> collection = db.getCollection("inventory");

         Now add the query.
         
         .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: nodejs
       content: |
         .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     #- id: php
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: perl
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: ruby
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 8
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: scala
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     - id: csharp
       content: |
         .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 15
            :end-before: End Example 15
