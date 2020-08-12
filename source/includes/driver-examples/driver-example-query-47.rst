.. tabs-drivers::

   tabs:
     - id: shell
       content: |
                  .. code-block:: javascript

            db.inventory.find(
               { status: "A" },
               { item: 1, status: 1, "size.uom": 1 }
            )

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

               { item: 1, status: 1, "size.uom": 1 }

         #. Click :guilabel:`Find`.

     - id: python
       content: |
                  .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: motor
       content: |
                  .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: java-sync
       content: |
         To specify a projection document, chain the
         com.mongodb.client.FindIterable.projection_ method to the
         ``find`` method. The example uses the
         com.mongodb.client.model.Projections_ class to create the
         projection documents.

                  .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: java-async
       content: |
                  .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_project.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: php
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: perl
       content: |
                  .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: ruby
       content: |
                  .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: scala
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: csharp
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 47
            :end-before: End Example 47

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 47
            :end-before: End Example 47
