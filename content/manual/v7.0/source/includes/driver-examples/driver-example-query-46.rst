.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.find( { status: "A" }, { status: 0, instock: 0 } )

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

               { status: 0, instock: 0 }

         #. Click :guilabel:`Find`.

     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

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
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_project.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: csharp
            :dedent: 12
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 46
            :end-before: End Example 46
