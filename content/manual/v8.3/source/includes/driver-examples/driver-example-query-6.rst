.. selected-content::
   :selections: mongosh, None

   .. include:: /includes/sample-data-usage.rst

.. selected-content::
   :selections: compass, None

   .. code-block:: javascript

      [
          { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
          { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
          { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
          { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
          { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
      ]

   For instructions on inserting documents in MongoDB Compass, see
   :ref:`Insert Documents <write-op-insert>`.

.. selected-content::
   :selections: driver, c

   .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
      :language: c
      :dedent: 3
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, python

   .. literalinclude:: /driver-examples/test_examples.py
      :language: python
      :dedent: 8
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, motor

   .. literalinclude:: /driver-examples/test_examples_motor.py
      :language: python
      :dedent: 8
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, java-sync

   .. literalinclude:: /driver-examples/DocumentationSamples.java
      :language: java
      :dedent: 8
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, java-async

   .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
      :language: java
      :dedent: 8
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, kotlin-coroutine

   .. literalinclude:: /driver-examples/kotlin_examples.kt
      :language: kotlin
      :dedent:
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, nodejs

   .. literalinclude:: /driver-examples/node_query.js
      :language: javascript
      :dedent: 4
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, php

   .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
      :language: php
      :dedent: 8
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, ruby

   .. literalinclude:: /driver-examples/shell_examples_spec.rb
      :language: ruby
      :dedent: 6
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, scala

   .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
      :language: scala
      :dedent: 4
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, csharp

   .. literalinclude:: /driver-examples/DocumentationExamples.cs
      :language: csharp
      :dedent: 12
      :start-after: Start Example 6
      :end-before: End Example 6

.. selected-content::
   :selections: driver, go

   .. literalinclude:: /driver-examples/go_examples.go
      :language: go
      :dedent: 2
      :start-after: Start Example 6
      :end-before: End Example 6