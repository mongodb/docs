.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )

     - id: compass
       content: |
         Copy the following filter into the Compass query bar and click
         :guilabel:`Find`:

         .. code-block:: javascript

            { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] }

     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: perl
       content: |

         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: csharp
            :dedent: 12
            :start-after: Start Example 12
            :end-before: End Example 12

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 12
            :end-before: End Example 12
