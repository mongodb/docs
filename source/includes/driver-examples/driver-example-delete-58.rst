.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.deleteOne( { status: "D" } )

     - id: compass
       content: |

         1. Click the :guilabel:`Table` button in the top navigation
            to access the :ref:`Table View <documents-table-view>`:

            .. figure:: /images/compass-table-btn-click-2.png
               :alt: Compass Table View button

            .. raw:: html

               <br>

         #. Use the Compass :ref:`query bar <query-bar-filter>` to
            locate the target document.

            Copy the following filter document into the query bar and click
            :guilabel:`Find`:


            .. code-block:: javascript

               { item: "paper" }

            .. figure:: /images/compass-delete-paper-find.png
               :alt: Compass Find button

            .. raw:: html

               <br>

         #. Hover over the document and click the trash icon which
            appears on the right-hand side:

            .. raw:: html

               <br>

            .. figure:: /images/compass-delete-button-click.png
               :alt: Compass Delete Document button

            .. raw:: html

               <br>

            After clicking the delete button, the document is flagged
            for deletion and Compass asks for confirmation that you
            want to remove the document:

            .. raw:: html

               <br>

            .. figure:: /images/compass-delete-confirm.png
               :alt: Compass Confirm Deletion button

            .. raw:: html

               <br>

         #. Click :guilabel:`Delete` to confirm. Compass deletes the
            document from the collection.

     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: nodejs
       content: |

         .. literalinclude:: /driver-examples/node_remove.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: perl
       content: |

         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 58
            :end-before: End Example 58
