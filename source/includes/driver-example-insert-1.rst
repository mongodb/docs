.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. code-block:: javascript

            db.inventory.insertOne(
               { "item" : "canvas", 
                 "qty" : 100, 
                 "tags" : ["cotton"], 
                 "size" : { "h" : 28, "w" : 35.5, "uom" : "cm" } 
               }
            )

     - id: compass
       content: |
         .. figure:: /images/compass-insert-document-inventory.png
            :figwidth: 700px

     - id: python
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1


     - id: go
       content: |
         .. literalinclude:: /includes/examples/curl_examples/examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: motor
       content: |
         .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

         For completeness, this is how you might wrap this call and run
         it with the asyncio event loop.

         Run the loop:
         
         .. code-block:: python
         
            async def do_insert_one():
                document = await db.inventory.insert_one(
                    {"item": "canvas",
                     "qty": 100,
                     "tags": ["cotton"],
                     "size": {"h": 28, "w": 35.5, "uom": "cm"}})
 
            loop = asyncio.get_event_loop()
            loop.run_until_complete(do_insert_one())

     - id: java-sync
       content: |
         Next, populate a Document with fields and an embedded document,
         and insert it into the database.

         .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     #- id: java-async
     #  content: |
     #    .. literalinclude:: /includes/examples/curl_examples/AsyncDocumentationSamples.java
     #       :language: java
     #       :dedent: 8
     #       :start-after: Start Example 1
     #       :end-before: End Example 1

     - id: nodejs
       content: |   
         .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1


     - id: csharp
       content: |
         .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 1
            :end-before: End Example 1

     # - id: php
     #   content: |
     #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
     #        :language: php
     #        :dedent: 8
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: perl
     #   content: |
     #     .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
     #        :language: perl
     #        :dedent: 4
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: ruby
     #   content: |
     #     .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
     #        :language: ruby
     #        :dedent: 6
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: scala
     #   content: |
     #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
     #        :language: scala
     #        :dedent: 4
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
