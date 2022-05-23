
.. note:: 
   
   Your ``ObjectId`` values will differ from those shown.


.. tabs-drivers::

   tabs:

     - id: python
       content: |

         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: crud_read.py
            :copyable: true

            .. input:: /includes/code/python/crud_read_final_noquery.py
               :language: python
               :linenos:

            .. output::
               :language: json

               {
                 '_id': ObjectId('621ff30d2a3e781873fcb65c'),
                 'name': 'Mercury',
                 'orderFromSun': 1,
                 'hasRings': False,
                 'mainAtmosphere': [],
                 'surfaceTemperatureC': {'min': -173, 'max': 427, 'mean': 67}
               },
               ...

     - id: go
       content: |

         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: crudRead.go
            :copyable: true

            .. input:: /includes/code/go/crud-read-final-noquery.go
               :language: go
               :linenos:

            .. output::
               :language: json

               map[_id:ObjectID("621ff30d2a3e781873fcb65c") hasRings:false mainAtmosphere:[] name:Mercury orderFromSun:1 surfaceTemperatureC:map[max:427 mean:67 min:-173]]
               ...

     - id: motor
       content: |

         .. code-block:: python

            {'_id': ObjectId('5adb4ee0aea650d05134bf62'), 'item': 'canvas', 'qty': 100, 'tags': ['cotton'], 'size': {'h': 28, 'w': 35.5, 'uom': 'cm'}}

     - id: java-sync
       content: |
         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: CrudRead.java
            :copyable: true

            .. input:: /includes/code/java/CrudReadFinalNoquery.java
               :language: java
               :linenos:

            .. output::
               :language: json

               {"_id": {"$oid": "621ff30d2a3e781873fcb65c"}, "name": "Mercury", "orderFromSun": 1, "hasRings": false, "mainAtmosphere": [], "surfaceTemperatureC": {"min": -173, "max": 427, "mean": 67}}
               ...




     - id: nodejs
       content: |

         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: crud-read.js
            :copyable: true

            .. input:: /includes/code/node/crud-read-final-noquery.js
               :language: javascript
               :linenos:

            .. output::
               :language: json

               {
                 '_id': ObjectId('621ff30d2a3e781873fcb65c'),
                 'name': 'Mercury',
                 'orderFromSun': 1,
                 'hasRings': False,
                 'mainAtmosphere': [],
                 'surfaceTemperatureC': {'min': -173, 'max': 427, 'mean': 67}
               },
               ...

     - id: csharp
       content: |
         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: CrudRead.cs
            :copyable: true

            .. input:: /includes/code/dotnet/CrudReadFinalNoquery.cs
               :language: csharp
               :linenos:

            .. output::
               :language: json

               {
                 '_id': ObjectId('621ff30d2a3e781873fcb65c'),
                 'name': 'Mercury',
                 'orderFromSun': 1,
                 'hasRings': False,
                 'mainAtmosphere': [],
                 'surfaceTemperatureC': {'min': -173, 'max': 427, 'mean': 67}
               },
               ...
