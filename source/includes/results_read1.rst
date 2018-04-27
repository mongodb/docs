
.. note::

   Your :method:`ObjectId` values will differ from those shown.

.. tabs-drivers::

   tabs:
     
     - id: shell
       content: |

         .. code-block:: javascript
  
            { "_id" : ObjectId("5a9854915c8eb0d368732649"), 
              "item" : "canvas", 
              "qty" : 100, 
              "tags" : [ "cotton" ], 
              "size" : { 
                          "h" : 28, 
                          "w" : 35.5, 
                          "uom" : "cm" 
                       } 
            }

     - id: compass
       content: |
       
         .. figure:: /images/compass-find-all.png
            :alt: Screenshot of Compass result grid
            :figwidth: 500px

     - id: python
       content: |
         
         .. code-block:: sh
          
            {u'_id': ObjectId('5ada5bdeaea650851c715601'),
            u'item': u'canvas',
            u'qty': 101,
            u'size': {u'h': 28, u'uom': u'cm', u'w': 35.5},
            u'tags': [u'cotton']}

     - id: motor
       content: |
         
         .. code-block:: sh

            {'_id': ObjectId('5adb4ee0aea650d05134bf62'), 'item': 'canvas', 'qty': 100, 'tags': ['cotton'], 'size': {'h': 28, 'w': 35.5, 'uom': 'cm'}}

     - id: java-sync
       content: |
         
         .. class: copyable-code
         .. code-block:: sh
         
            { "_id" : { "$oid" : "5ada85ae9b267e9ac4d84105" }, "item" : "canvas", "qty" : 100, "tags" : ["cotton"], "size" : { "h" : 28, "w" : 35.5, "uom" : "cm" } }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            { _id: 5ade4124aac4f92cf89f53aa,
              item: 'journal',
              qty: 25,
              size: { h: 14, w: 21, uom: 'cm' },
              status: 'A' }

     - id: csharp
       content: |
         .. code-block:: sh
           
            { "_id" : ObjectId("5ade1ebd9299811bc223e797"), "item" : "canvas", "qty" : 100, "tags" : ["cotton"], "size" : { "h" : 28, "w" : 35.5, "uom" : "cm" } #}
