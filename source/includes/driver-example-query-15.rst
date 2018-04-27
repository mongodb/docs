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
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: motor
       content: |
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: java-sync
       content: |

         First you will need to create the MongoCollection object you would like to query against.

         .. code-block:: sh

            MongoCollection<Document> collection = db.getCollection("inventory");

         Now add the query.
         
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     #- id: php
     #  content: |
     #    .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: perl
     #  content: |
     #    .. literalinclude:: /driver-examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: ruby
     #  content: |
     #    .. literalinclude:: /driver-examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 8
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     #- id: scala
     #  content: |
     #    .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 15
     #       :end-before: End Example 15

     - id: csharp
       content: |
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 15
            :end-before: End Example 15
