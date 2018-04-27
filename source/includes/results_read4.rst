.. note:: Your :method:`ObjectId` values will differ from those shown.

.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: sh

            { "_id" : ObjectId("5ae14d2e124da839884ff93a"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93b"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }

     - id: compass
       content: |

         .. figure:: /images/compass-find-nested-field.png

     - id: python
       content: |
         
         .. code-block:: sh
          
            {u'_id': ObjectId('5ada625baea65088bf0aa132'),
             u'item': u'notebook',
             u'qty': 50,
             u'size': {u'h': 8.5, u'uom': u'in', u'w': 11},
             u'status': u'A'}
            {u'_id': ObjectId('5ada625baea65088bf0aa133'),
             u'item': u'paper',
             u'qty': 100,
             u'size': {u'h': 8.5, u'uom': u'in', u'w': 11},
             u'status': u'D'}

     - id: motor
       content: |
         
         .. code-block:: sh
         
            {'_id': ObjectId('5adb5140aea650d18e402f18'),
             'item': 'notebook',
             'qty': 50,
             'size': {'h': 8.5, 'uom': 'in', 'w': 11},
             'status': 'A'}
            {'_id': ObjectId('5adb5140aea650d18e402f19'),
             'item': 'paper',
             'qty': 100,
             'size': {'h': 8.5, 'uom': 'in', 'w': 11},
             'status': 'D'}

     - id: java-sync
       content: |
         Create a method to print the results of the iteration 
         
         .. class: copyable-code
         .. code-block:: sh
         
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393ba" }, "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393bb" }, "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            { _id: 5ade424c84c9ca2d56d31698,
              item: 'notebook',
              qty: 50,
              size: { h: 8.5, w: 11, uom: 'in' },
              status: 'A' }
            { _id: 5ade424c84c9ca2d56d31699,
              item: 'paper',
              qty: 100,
              size: { h: 8.5, w: 11, uom: 'in' },
              status: 'D' }

            
     #- id: php
     #  content: |
     #    .. code-block:: sh
     #       
     #       foreach ( $cursor as $id => $value )
     #       {
     #           var_dump( $value );
     #       }

     #- id: perl
     #  content: |
     #    .. code-block:: sh
     #    
     #       while (my $doc = $cursor->next) {
     #           print $doc ."\n";
     #       } 

     #- id: ruby
     #  content: |
     #    .. code-block:: sh
     #       
     #       cursor.each do |doc|
     #          puts doc
     #       end

     #- id: scala
     #  content: |
     #    .. code-block:: sh
     #       
     #       collection.find().subscribe((doc: Document) => println(doc.toJson()))
           

     - id: csharp
       content: |
         .. code-block:: sh
           
            { "_id" : ObjectId("5ade2538321fd31f43ea1f56"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ade2538321fd31f43ea1f57"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
