
.. tabs-drivers::

   tabs:

     - id: python
       content: |

         .. io-code-block::
            :caption: crud_read.py
            :copyable: true

            .. input::
               :language: python
               :linenos:

               cursor = coll.find(
                   {"$and": [{"orderFromSun": {"$gt": 2}}, {"orderFromSun": {"$lt": 5}}]}
               )

            .. output:: /includes/crud/implicit_and_out.txt
               :language: json

     - id: nodejs
       content: |

         .. io-code-block::
            :caption: crud-read.js
            :copyable: true

            .. input::
               :language: javascript
               :linenos:

               const cursor = coll.find({
                 $and: [{ orderFromSun: { $gt: 2 } }, { orderFromSun: { $lt: 5 } }],
               });

            .. output:: /includes/crud/implicit_and_out.txt
               :language: json
