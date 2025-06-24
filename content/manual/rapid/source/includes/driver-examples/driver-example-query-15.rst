.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:


         .. code-block:: javascript

            { size: { h: 14, w: 21, uom: "cm" } }

         .. figure:: /images/compass-match-embedded.png
            :alt: Query embedded field

     - id: c
       content: |

         .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
            :language: c
            :dedent: 3
            :start-after: Start Example 15
            :end-before: End Example 15  

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

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: kotlin-coroutine
       content: |

         .. literalinclude:: /driver-examples/kotlin_examples.kt
            :language: kotlin
            :dedent:
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query_embedded_documents.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15
            
     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: csharp
            :dedent: 12
            :start-after: Start Example 15
            :end-before: End Example 15

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 15
            :end-before: End Example 15
