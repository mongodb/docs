.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         .. code-block:: sh

            { "_id" : ObjectId("5ae14d2e124da839884ff939"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }


     - id: compass
       content: |

         .. figure:: /images/compass-find-filter-and.png

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
         
         .. code-block:: sh
            
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393b9" }, "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }

     - id: nodejs
       content: |

         .. code-block:: sh
            
            { _id: 5ade424c84c9ca2d56d31697,
              item: 'journal',
              qty: 25,
              size: { h: 14, w: 21, uom: 'cm' },
              status: 'A' }

            
     - id: csharp
       content: |
         
         .. code-block:: sh
         
            { "_id" : ObjectId("5ade26de3d3a851fcd9c95da"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }