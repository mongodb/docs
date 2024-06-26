.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.insertOne(
               { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
            )

     - id: compass
       content: |
         .. figure:: /images/compass-insert-document-inventory.png
            :alt: Compass insert new document into collection

     - id: c
       content: |

         .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
            :language: c
            :dedent: 3
            :start-after: Start Example 1
            :end-before: End Example 1
     
     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: kotlin-coroutine
       content: |

         .. literalinclude:: /driver-examples/kotlin_examples.kt
            :language: kotlin
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: nodejs
       content: |

         .. literalinclude:: /driver-examples/node_insert.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: perl
       content: |

         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 6
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: csharp
            :dedent: 12
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 1
            :end-before: End Example 1
