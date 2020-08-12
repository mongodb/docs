.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         .. code-block:: javascript

            db.inventory.find( { item : { $exists: false } } )

     - id: compass
       content: |
         Copy the following query filter document into the
         :ref:`query bar <compass-query-bar>` and click
         :guilabel:`Find`:

         
         .. code-block:: javascript

            { item : { $exists: false } }

         .. figure:: /images/compass-find-null-existence-check.png

     - id: python
       content: |
                  .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: motor
       content: |
                  .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: java-sync
       content: |
                  .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: java-async
       content: |
                  .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query_for_null_fields.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: php
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: perl
       content: |
                  .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: ruby
       content: |
                  .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: scala
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: csharp
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 41
            :end-before: End Example 41

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 41
            :end-before: End Example 41
