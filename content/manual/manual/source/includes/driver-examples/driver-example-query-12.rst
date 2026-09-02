.. selected-content::
   :selections: mongosh, None

   .. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-documents/find-or.snippet.find-or-conditions.js
      :language: javascript
      :category: usage example

.. selected-content::
   :selections: compass, None

   Copy the following filter into the Compass query bar and click
   :guilabel:`Find`:

   .. code-block:: javascript

      { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] }

.. selected-content::
   :selections: driver, c

   .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
      :language: c
      :dedent: 3
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, python

   .. literalinclude:: /driver-examples/test_examples.py
      :language: python
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, motor

   .. literalinclude:: /driver-examples/test_examples_motor.py
      :language: python
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, java-sync

   .. literalinclude:: /driver-examples/DocumentationSamples.java
      :language: java
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, java-async

   .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
      :language: java
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, kotlin-coroutine

   .. literalinclude:: /driver-examples/kotlin_examples.kt
      :language: kotlin
      :dedent:
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, nodejs

   .. literalinclude:: /driver-examples/node_query.js
      :language: javascript
      :dedent: 6
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, php

   .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
      :language: php
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, ruby

   .. literalinclude:: /driver-examples/shell_examples_spec.rb
      :language: ruby
      :dedent: 8
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, scala

   .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
      :language: scala
      :dedent: 4
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, csharp

   .. literalinclude:: /driver-examples/DocumentationExamples.cs
      :language: csharp
      :dedent: 12
      :start-after: Start Example 12
      :end-before: End Example 12

.. selected-content::
   :selections: driver, go

   .. literalinclude:: /driver-examples/go_examples.go
      :language: go
      :dedent: 2
      :start-after: Start Example 12
      :end-before: End Example 12