.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         .. code-block:: sh

            { "_id" : ObjectId("5ae14d2e124da839884ff939"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }

     - id: compass
       content: |

         .. figure:: /images/compass-match-embedded.png


     - id: python
       content: |
         
         .. code-block:: sh
          
            {u'_id': ObjectId('5ada625baea65088bf0aa131'),
             u'item': u'journal',
             u'qty': 25,
             u'size': {u'h': 14, u'uom': u'cm', u'w': 21},
             u'status': u'A'}

     - id: motor
       content: |
         
         .. code-block:: sh

            {'_id': ObjectId('5adb5140aea650d18e402f17'),
             'item': 'journal',
             'qty': 25,
             'size': {'h': 14, 'uom': 'cm', 'w': 21},
             'status': 'A'}

     - id: java-sync
       content: |
         
         .. class: copyable-code
         .. code-block:: sh
         
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393b9" }, "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            { _id: 5ade424c84c9ca2d56d31697,
              item: 'journal',
              qty: 25,
              size: { h: 14, w: 21, uom: 'cm' },
              status: 'A' }

            
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

     #    .. note:: The MongoDB perl driver does not support insertion order. As a result your query results may not match what is expected.
     #    
     #    .. code-block:: sh
     #    
     #       

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
           
            { "_id" : ObjectId("5ade248f6847901ef531c3ff"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }å