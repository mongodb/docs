.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.find( { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:


         .. code-block:: javascript

            { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" }

         .. figure:: /images/compass-find-embedded-and.png
            :alt: Query multiple nested fields

     - id: c
       content: |

         .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
            :language: c
            :dedent: 3
            :start-after: Start Example 19
            :end-before: End Example 19
      
            
     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: kotlin-coroutine
       content: |

         .. literalinclude:: /driver-examples/kotlin_examples.kt
            :language: kotlin
            :dedent:
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query_embedded_documents.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: csharp
            :dedent: 12
            :start-after: Start Example 19
            :end-before: End Example 19

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 19
            :end-before: End Example 19
