.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         .. code-block:: sh
            
            { "_id" : ObjectId("5ae14d2e124da839884ff939"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93a"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ae14d2e124da839884ff93d"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }


     - id: compass
       content: |

         .. figure:: /images/compass-find-filter-or.png

     - id: python
       content: |
         
         .. code-block:: sh
            
            {'_id': ObjectId('5ae14d2e124da839884ff939'),
             'item': 'journal',
             'qty': 25,
             'size': {'h': 14, 'uom': 'cm', 'w': 21},
             'status': 'A'}
            {'_id': ObjectId('5ae14d2e124da839884ff93a'),
             'item': 'notebook',
             'qty': 50,
             'size': {'h': 8.5, 'uom': 'in', 'w': 11},
             'status': 'A'}
            {'_id': ObjectId('5ae14d2e124da839884ff93d'),
             'item': 'postcard',
             'qty': 45,
             'size': {'h': 10, 'uom': 'cm', 'w': 15.25},
             'status': 'A'}

     - id: motor
       content: |
         
         .. code-block:: sh
            
            {'_id': ObjectId('5ae14d2e124da839884ff939'),
             'item': 'journal',
             'qty': 25,
             'size': {'h': 14, 'uom': 'cm', 'w': 21},
             'status': 'A'}
             '_id': ObjectId('5ae14d2e124da839884ff93a'),
             'item': 'notebook',
             'qty': 50,
             'size': {'h': 8.5, 'uom': 'in', 'w': 11},
             'status': 'A'}
             '_id': ObjectId('5ae14d2e124da839884ff93d'),
             'item': 'postcard',
             'qty': 45,
             'size': {'h': 10, 'uom': 'cm', 'w': 15.25},
             'status': 'A'}

     - id: java-sync
       content: |
         
         .. code-block:: sh
            
            { "_id" : { "$oid" : "5ae39ecb124da8e9ed76c17f" }, "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : { "$oid" : "5ae39ecb124da8e9ed76c180" }, "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : { "$oid" : "5ae39ecb124da8e9ed76c183" }, "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }

     - id: nodejs
       content: |

         .. code-block:: sh
            
            [ { _id: 5ae3a1a0fe333febb35af7b3,
                item: 'journal',
                qty: 25,
                size: { h: 14, w: 21, uom: 'cm' },
                status: 'A' },
              { _id: 5ae3a1a0fe333febb35af7b4,
                item: 'notebook',
                qty: 50,
                size: { h: 8.5, w: 11, uom: 'in' },
                status: 'A' },
              { _id: 5ae3a1a0fe333febb35af7b7,
                item: 'postcard',
                qty: 45,
                size: { h: 10, w: 15.25, uom: 'cm' },
                status: 'A' } ]

     - id: csharp
       content: |
         .. code-block:: sh
            
            { "_id" : ObjectId("5ae3a38356cd4decbfea7a29"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
            { "_id" : ObjectId("5ae3a38356cd4decbfea7a2a"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
            { "_id" : ObjectId("5ae3a38356cd4decbfea7a2d"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }