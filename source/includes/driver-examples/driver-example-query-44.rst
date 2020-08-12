.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( { status: "A" }, { item: 1, status: 1 } )

     - id: compass
       content: |
         
         1. Copy the following expression into the :guilabel:`Filter`
            field:

            .. code-block:: javascript

               { status: "A" }

         #. Click :guilabel:`Options` to open the additional query
            options.

         #. Copy the following expression into the :guilabel:`Project`
            field:

            .. code-block:: javascript

               { item: 1, status: 1 }

         #. Click :guilabel:`Find`.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: java-sync
       content: |
         To specify a projection document, chain the
         com.mongodb.client.FindIterable.projection_ method to the
         ``find`` method. The example uses the
         com.mongodb.client.model.Projections_ class to create the
         projection documents.

         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_project.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 44
            :end-before: End Example 44

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 44
            :end-before: End Example 44
