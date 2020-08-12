.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( { item: "canvas" } )

     - id: compass
       content: |
         .. figure:: /images/compass-query-collection.png

         Specify a filter in the MongoDB Compass query bar and click
         :guilabel:`Find` to execute the query.

         The above filter specifies that MongoDB Compass only return
         documents where the ``item`` field is equal to ``canvas``.

         For more information on the MongoDB Compass Query Bar, see the
         Compass
         `Query Bar <https://docs.mongodb.com/compass/master/query-bar/>`_
         documentation.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_insert.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 2
            :end-before: End Example 2

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 2
            :end-before: End Example 2
