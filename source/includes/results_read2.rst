.. note:: Your :method:`ObjectId` values will differ from those shown.

.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript
      
            {
             item: "paper",
             qty: 100,
             size: {
               h: 8.5,
               w: 11,
               uom: "in"
               },
             status: "D"
            },
            {
             item: "planner",
             qty: 75,
             size: {
               h: 22.85,
               w: 30,
               uom: "cm"
               },
             status: "D"
            }

     - id: compass
       content: |

         .. figure:: /images/compass-find-filter-inventory.png

     - id: python
       content: |
         
         .. code-block:: sh
          
           {u'_id': ObjectId('5ada8c109b267e9d1ade903a'),
            u'item': u'paper',
            u'qty': 100,
            u'size': {u'h': 8.5, u'uom': u'in', u'w': 11},
            u'status': u'D'}
           {u'_id': ObjectId('5ada8c109b267e9d1ade903b'),
            u'item': u'planner',
            u'qty': 75,
            u'size': {u'h': 22.85, u'uom': u'cm', u'w': 30},
            u'status': u'D'}

     - id: motor
       content: |
         
         .. code-block:: sh

           {'_id': ObjectId('5adb5140aea650d18e402f19'),
            'item': 'paper',
            'qty': 100,
            'size': {'h': 8.5, 'uom': 'in', 'w': 11},
            'status': 'D'}
           {'_id': ObjectId('5adb5140aea650d18e402f1a'),
            'item': 'planner',
            'qty': 75,
            'size': {'h': 22.85, 'uom': 'cm', 'w': 30},
            'status': 'D'}

     - id: java-sync
       content: |
           
         .. class: copyable-code
         .. code-block:: sh
         
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393bb" }, "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393bc" }, "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            { _id: 5ade424c84c9ca2d56d31699,
              item: 'paper',
              qty: 100,
              size: { h: 8.5, w: 11, uom: 'in' },
              status: 'D' }
            { _id: 5ade424c84c9ca2d56d3169a,
              item: 'planner',
              qty: 75,
              size: { h: 22.85, w: 30, uom: 'cm' },
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
           
            { "_id" : ObjectId("5ade239b5923f61e2db8541e"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
            { "_id" : ObjectId("5ade239b5923f61e2db8541f"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.850000000000001, "w" : 30, "uom" : "cm" }, "status" : "D" }