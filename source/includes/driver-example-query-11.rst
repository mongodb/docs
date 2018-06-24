.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. code-block:: javascript

            myCursor = db.inventory.find( { status: "A", qty: { $lt: 30 } } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:

         .. code-block:: javascript

            { status: "A", qty: { $lt: 30 } }


     - id: python
       content: |
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 11
            :end-before: End Example 11

     - id: motor
       content: |
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 11
            :end-before: End Example 11

     - id: java-sync
       content: |
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 11
            :end-before: End Example 11

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 11
            :end-before: End Example 11

     #- id: php
     #  content: |
     #    .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 11
     #       :end-before: End Example 11

     #- id: perl
     #  content: |
     #    .. literalinclude:: /driver-examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 11
     #       :end-before: End Example 11

     #- id: ruby
     #  content: |
     #    .. literalinclude:: /driver-examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 8
     #       :start-after: Start Example 11
     #       :end-before: End Example 11

     #- id: scala
     #  content: |
     #    .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 11
     #       :end-before: End Example 11

     - id: csharp
       content: |
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 11
            :end-before: End Example 11
