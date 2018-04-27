.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         .. code-block:: sh

            { "_id" : ObjectId("5ae14d2e124da839884ff939"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93a"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93b"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93d"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }

     - id: compass
       content: |

         .. figure:: /images/compass-find-nested-query-op.png

     - id: python
       content: |
         
         .. code-block:: sh
          
            {u'_id': ObjectId('5ada625baea65088bf0aa131'),
             u'item': u'journal',
             u'qty': 25,
             u'size': {u'h': 14, u'uom': u'cm', u'w': 21},
             u'status': u'A'}
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
            {u'_id': ObjectId('5ada625baea65088bf0aa135'),
             u'item': u'postcard',
             u'qty': 45,
             u'size': {u'h': 10, u'uom': u'cm', u'w': 15.25},
             u'status': u'A'}

     - id: motor
       content: |
         
         .. code-block:: sh

            {'_id': ObjectId('5adb5140aea650d18e402f17'),
             'item': 'journal',
             'qty': 25,
             'size': {'h': 14, 'uom': 'cm', 'w': 21},
             'status': 'A'}
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
            {'_id': ObjectId('5adb5140aea650d18e402f1b'),
             'item': 'postcard',
             'qty': 45,
             'size': {'h': 10, 'uom': 'cm', 'w': 15.25},
             'status': 'A'}
             
     - id: java-sync
       content: |
         Create a method to print the results of the iteration 
         
         .. class: copyable-code
         .. code-block:: sh
         
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393b9" }, "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393ba" }, "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393bb" }, "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
            { "_id" : { "$oid" : "5ada88359b267e9b5bd393bd" }, "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            { _id: 5ade424c84c9ca2d56d31697,
              item: 'journal',
              qty: 25,
              size: { h: 14, w: 21, uom: 'cm' },
              status: 'A' }
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
            { _id: 5ade424c84c9ca2d56d3169b,
              item: 'postcard',
              qty: 45,
              size: { h: 10, w: 15.25, uom: 'cm' },
              status: 'A' }

     - id: csharp
       content: |
         .. code-block:: sh
           
            { "_id" : ObjectId("5ade261a9270d01f8c3d2750"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : ObjectId("5ade261a9270d01f8c3d2751"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ade261a9270d01f8c3d2752"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
            { "_id" : ObjectId("5ade261a9270d01f8c3d2754"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }