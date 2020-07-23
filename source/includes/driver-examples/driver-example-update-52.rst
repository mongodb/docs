.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            db.inventory.updateOne(
               { item: "paper" },
               {
                 $set: { "size.uom": "cm", status: "P" },
                 $currentDate: { lastModified: true }
               }
            )

         .. include:: /includes/fact-update-operation-uses.rst

     - id: compass
       content: |
         Modify the target document as follows:

         - Change the ``status`` field from ``D`` to ``P``.

         - Change the ``size.uom`` field from ``in`` to ``cm``.

         - Add a new field called ``lastModified`` whose value will
           be today's date.

         1. Click the :guilabel:`Table` button in the top navigation
            to access the :ref:`Table View <documents-table-view>`:

            .. figure:: /images/compass-table-btn-click.png
               :alt: Access Table View

         #. Use the Compass :ref:`query bar <query-bar-filter>` to
            locate the target document.

            Copy the following filter document into the query bar and click
            :guilabel:`Find`:


            .. code-block:: javascript

               { item: "paper" }

            .. figure:: /images/compass-update-paper-filter.png
               :alt: Find Paper document

         #. Hover over the ``status`` field and click the pencil icon
            which appears on the right side of the document to enter
            edit mode:

            .. figure:: /images/compass-edit-paper-example.png
               :alt: Click edit button

         #. Change the value of the field to ``"P"``.

         #. Click the :guilabel:`Update` button below the field to
            save your changes.

         #. Hover over the ``size`` field and click the
            outward-pointing arrows which appear on the right side of
            the field. This opens a new tab which displays the fields
            within the ``size`` object:

            .. figure:: /images/compass-edit-paper-expand.png
               :alt: Expand size object

         #. Using the same process outlined in steps 3-5 for editing the
            ``status`` field, change the value of the ``size.uom`` field
            to ``"cm"``.

         #. Click the left-most tab above the table labelled
            ``inventory`` to return to the original table view, which
            displays the top-level document:

            .. figure:: /images/compass-edit-inv-tab-click.png
               :alt: Click inventory tab

         #. Hover over the ``status`` field and click the pencil icon
            which appears on the right side of the document to re-enter
            edit mode.

         #. Click inside of the ``status`` field and click the
            :guilabel:`plus button` icon which appears in the edit menu.

            Click the :guilabel:`Add Field After status` button which
            appears below the plus button:

            .. figure:: /images/compass-edit-paper-add-field-after.png
               :alt: Add field after status

         #. Add a new field called ``lastModified`` with a value of
            today's date. Set the field type to ``Date``:

            .. figure:: /images/compass-edit-paper-add-last-modified.png
               :alt: Submit update

         #. Click the :guilabel:`Update` button below the field to
            save your changes.

            .. note::

               Because |compass| does not support
               :update:`$currentDate` or any other
               :doc:`Field Update Operators </reference/operator/update-field>`,
               you must manually enter the date value in Compass.

     - id: python
       content: |

         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

     - id: motor
       content: |

         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: java-async
       content: |

         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_update.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: perl
       content: |

         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: ruby
       content: |

         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: scala
       content: |

         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 52
            :end-before: End Example 52

         .. include:: /includes/fact-update-operation-uses.rst
