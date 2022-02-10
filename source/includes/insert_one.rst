.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         The following example inserts a new document into the
         ``inventory`` collection. If the document does not specify
         an ``_id`` field, MongoDB adds the ``_id`` field with an
         ObjectId value to the new document.

     - id: compass
       content: |
         To insert a single document using MongoDB Compass:

         1. Navigate to the collection you wish to insert the document
            into:

            a. In the left-hand MongoDB Compass navigation pane, click
               the database to which your target collection belongs.

            b. From the database view, click the target collection name.

         2. Click the :guilabel:`Insert Document` button:

            .. figure:: /images/compass-insert-button.png

         3. For each field in the document, select the field type and
            fill in the field name and value. Add fields by clicking
            the last line number, then clicking
            :guilabel:`Add Field After ...`

            - For ``Object`` types, add nested fields by clicking the
              last field's number and selecting
              :guilabel:`Add Field After ...`

            - For ``Array`` types, add additional elements to the array
              by clicking the last element's line number and selecting
              :guilabel:`Add Array Element After ...`

         4. Once all fields have been filled out, click :guilabel:`Insert`.

         The following example inserts a new document into the
         ``test.inventory`` collection:

     - id: python
       content: |
         The following example inserts a new document into the
         ``inventory`` collection. If the document does not specify
         an ``_id`` field, the PyMongo driver adds the ``_id`` field
         with an ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

     - id: motor
       content: |
         
         The following example shows the api call required to insert a
         new document into the ``inventory`` collection. If the document
         does not specify an ``_id`` field, the Motor driver adds the
         ``_id`` field with an ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

     - id: go
       content: |
         The following example shows the api call required to insert a
         new document into the ``inventory`` collection. If the document
         does not specify an ``_id`` field, the Go driver adds the
         ``_id`` field with an ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

         Before inserting the data, you'll need to assign the
         ``inventory`` collection in the ``test`` database to a 
         variable

         .. literalinclude:: /includes/examples/go/assign/assign.go
            :language: go
            :dedent: 2
            :start-after: Start Collection
            :end-before: End Collection

     - id: java-sync
       content: |
         The following example inserts a new document into the
         ``inventory`` collection. If the document does not specify
         an ``_id`` field, the driver adds the ``_id`` field with an
         ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

         First, get the inventory collection.

         .. literalinclude:: /includes/examples/java/ConnectExample.java
            :language: java
            :dedent: 4
            :start-after: Start Collection
            :end-before: End Collection

     #- id: java-async
     #  content: |

     #    The following example inserts a new document into the
     #    ``inventory`` collection. If the document does not specify
     #    an ``_id`` field, the driver adds the ``_id`` field with an
     #    ObjectId value to the new document. See
     #    :ref:`write-op-insert-behavior`.

     #    First, bind to the ``inventory`` collection.

     #    .. literalinclude:: /includes/examples/java/ConnectTest.java
     #       :language: java
     #       :dedent: 4
     #       :start-after: Start Collection Bind
     #       :end-before: End Collection Bind

     - id: nodejs
       content: |
         The following example inserts a new document into the
         ``inventory`` collection. If the document does not specify
         an ``_id`` field, the Node.js driver adds the ``_id`` field
         with an ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

     - id: csharp
       content: |
         The following example inserts a new document into the
         ``inventory`` collection. If the document does not specify
         an ``_id`` field, the C# driver adds the ``_id`` field
         with an ObjectId value to the new document. See
         :ref:`write-op-insert-behavior`.

     # - id: php
     #   content: |
     #     The following example inserts a new document into the
     #     ``inventory`` collection. If the document does not specify
     #     an ``_id`` field, the PHP driver adds the ``_id`` field
     #     with an ObjectId value to the new document. See
     #     :ref:`write-op-insert-behavior`.
     #
     # - id: perl
     #   content: |
     #     The following example inserts a new document into the
     #     ``inventory`` collection. If the document does not specify
     #     an ``_id`` field, the Perl driver adds the ``_id`` field
     #     with an ObjectId value to the new document. See
     #     :ref:`write-op-insert-behavior`.
     #
     # - id: ruby
     #   content: |
     #     The following example inserts a new document into the
     #     ``inventory`` collection. If the document does not specify
     #     an ``_id`` field, the Ruby driver adds the ``_id`` field
     #     with an ObjectId value to the new document. See
     #     :ref:`write-op-insert-behavior`.
     #
     # - id: scala
     #   content: |
     #     The following example inserts a new document into the
     #     ``inventory`` collection. If the document does not specify
     #     an ``_id`` field, the Scala driver adds the ``_id`` field
     #     with an ObjectId value to the new document. See
     #     :ref:`write-op-insert-behavior`.

