.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            myCursor = db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:

         .. code-block:: javascript

            { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] }

     - id: python
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12


     - id: go
       content: |
         .. literalinclude:: /includes/examples/curl_examples/examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: motor
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

         For completeness, this is how you might wrap this call and run
         it with the asyncio event loop.

         .. code-block:: python
            
            async def do_retrieve_or():
                cursor = db.inventory.find({"$or": [{"status": "A"}, {"qty": {"$lt": 30}}]})
                async for doc in cursor:
                    pprint.pprint(doc)
            loop = asyncio.get_event_loop()
            loop.run_until_complete(do_retrieve_or())

     - id: java-sync
       content: |
         .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: nodejs
       content: |
         .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: csharp
       content: |
         .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 12
            :end-before: End Example 12

     #- id: php
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 12
     #       :end-before: End Example 12

     #- id: perl
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 12
     #       :end-before: End Example 12

     #- id: ruby
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 8
     #       :start-after: Start Example 12
     #       :end-before: End Example 12

     #- id: scala
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 12
     #       :end-before: End Example 12

