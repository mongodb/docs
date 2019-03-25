.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( {
                 status: "A",
                 $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
            } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:

         .. class:: copyable-code
         .. code-block:: javascript

            { status: "A", $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ] }

         .. figure:: /images/compass-find-filter-and-or.png


     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 13
            :end-before: End Example 13

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 13
            :end-before: End Example 13
