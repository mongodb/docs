
.. note:: Your ``ObjectId`` values will differ from those shown.

.. tabs-drivers::

   tabs:

     - id: python
       content: |

         .. code-block:: python

            {u'_id': ObjectId('5ada5bdeaea650851c715601'),
            u'item': u'canvas',
            u'qty': 101,
            u'size': {u'h': 28, u'uom': u'cm', u'w': 35.5},
            u'tags': [u'cotton']}

     - id: go
       content: |

         .. code-block:: go

            &[{_id ObjectID("5c3cedaaca9a5662c1238181")} {item canvas} {qty 100} {tags [cotton]} {size [{h 28} {w 35.5} {uom cm}]}]

     - id: motor
       content: |

         .. code-block:: python

            {'_id': ObjectId('5adb4ee0aea650d05134bf62'), 'item': 'canvas', 'qty': 100, 'tags': ['cotton'], 'size': {'h': 28, 'w': 35.5, 'uom': 'cm'}}

     - id: java-sync
       content: |

         .. code-block:: java

            { "_id" : { "$oid" : "5ada85ae9b267e9ac4d84105" }, "item" : "canvas", "qty" : 100, "tags" : ["cotton"], "size" : { "h" : 28, "w" : 35.5, "uom" : "cm" } }

     - id: nodejs
       content: |
         .. code-block:: javascript

            {
               _id: new ObjectId("6220f6b78a733c51b416c80e"),
               name: 'Uranus',
               orderFromSun: 7,
               hasRings: true,
               mainAtmosphere: [ 'H2', 'He', 'CH4' ],
               surfaceTemperatureC: { min: null, max: null, mean: -197.2 }
            },
            ...

     - id: csharp
       content: |
         .. code-block:: c#

            { "_id" : ObjectId("5ade1ebd9299811bc223e797"), "item" : "canvas", "qty" : 100, "tags" : ["cotton"], "size" : { "h" : 28, "w" : 35.5, "uom" : "cm" } #}
