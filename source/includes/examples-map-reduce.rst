Map-Reduce Examples
-------------------

.. map-reduce-examples-begin

Consider the following map-reduce operations on a collection ``orders``
that contains documents of the following prototype:

.. code-block:: javascript

   {
        _id: ObjectId("50a8240b927d5d8b5891743c"),
        cust_id: "abc123",
        ord_date: new Date("Oct 04, 2012"),
        status: 'A',
        price: 250,
        items: [ { sku: "mmm", qty: 5, price: 2.5 },
                 { sku: "nnn", qty: 5, price: 2.5 } ]
   }

.. map-reduce-document-prototype-end

Sum the Price Per Customer Id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. map-reduce-sum-price

Perform map-reduce operation on the ``orders`` collection to group by
the ``cust_id``, and for each ``cust_id``, calculate the sum of the
``price`` for each ``cust_id``:

   .. map-reduce-map-function-begin

#. Define the ``<map>`` function to process each document in the
   map-reduce process:

   - In the function, ``this`` refers to the document currently being
     processed.

   - The function maps the ``price`` to the ``cust_id`` for each
     document and emits the ``cust_id`` and ``price`` pair.

   .. code-block:: javascript

      var mapFunction1 = function() {
                             emit(this.cust_id, this.price);
                         };

   .. map-reduce-map-function-end

#. Define the corresponding ``<reduce>`` function with two arguments
   ``keyCustId`` and ``valuesPrices``:

   - The ``valuesPrices`` is an array whose elements are the ``price``
     values mapped to the particular ``keyCustId`` by the ``<map>``
     function.

   - The function reduces the ``valuesPrice`` array to the
     sum of its elements.

   .. code-block:: javascript

      var reduceFunction1 = function(keyCustId, valuesPrices) {
                                return Array.sum(valuesPrices);
                            };

#. Perform map-reduce on all documents in the ``orders`` collection
   using the ``mapFunction1`` function and the ``reduceFunction1``
   function. Output the results to a collection ``map_reduce_example``.
   If the ``map_reduce_example`` collection already exists, the
   operation will replace the contents with the results of this
   map-reduce operation:

   .. map-reduce-sum-price-wrapper-begin
   .. code-block:: javascript

      db.orders.mapReduce( 
                           mapFunction1,
                           reduceFunction1,
                           { out: "map_reduce_example" }   
                         )

   .. map-reduce-sum-price-wrapper-end
   .. map-reduce-sum-price-cmd-begin
   .. code-block:: javascript

      db.runCommand(
                     {
                       mapreduce: 'orders',
                       map: mapFunction1,
                       reduce: reduceFunction1,
                       out: 'map_reduce_example'
                     } 
                   )
   .. map-reduce-sum-price-cmd-end

Calculate the Number of Orders, Total Quantity, and Average Quantity Per Item
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. map-reduce-item-counts

Perform map-reduce operation on the ``orders`` collection to group by
the item sku, and for each sku, calculate the number of orders and the
total quantity ordered. Finally, calculate the average quantity per
order for each sku. Process only the documents with ``ord_date``
greater than ``01/01/2012`` for the map-reduce:

#. Define the ``<map>`` function to process each document in the
   map-reduce process:

   - In the function, ``this`` refers to the document currently being
     processed.

   - For each item, the function associates the ``sku`` with a new
     object ``value`` that contains the ``count`` of ``1`` and the
     item ``qty`` for the order and emits the ``sku`` and ``value`` pair.

   .. code-block:: javascript

      var mapFunction2 = function() {
                             for (var idx = 0; idx < this.items.length; idx++) {
                                 var key = this.items[idx].sku;
                                 var value = {
                                               count: 1, 
                                               qty: this.items[idx].qty 
                                             };
                                 emit(key, value);
                             }
                          };

#. Define the corresponding ``<reduce>`` function with two arguments
   ``keySKU`` and ``valuesCountObjects``:

   - ``valuesCountObjects`` is an array whose elements are the objects
     mapped to the particular ``keySKU`` by the ``<map>`` function. 
     
   - The function reduces the ``valuesCountObjects`` array to a single
     object ``reducedValue`` that also contains the ``count`` and the
     ``qty`` fields.

   - In ``reducedValue``, the ``count`` field contains the sum of the
     ``count`` fields from the individual array elements, and the
     ``qty`` field contains the sum of the ``qty`` fields from the
     individual array elements.

   .. code-block:: javascript

      var reduceFunction2 = function(keySKU, valuesCountObjects) {
                                reducedValue = { count: 0, qty: 0 }; 

                                for (var idx = 0; idx < valuesCountObjects.length; idx++) {
                                    reducedValue.count += valuesCountObjects[idx].count;
                                    reducedValue.qty += valuesCountObjects[idx].qty;
                                }

                                return reducedValue;
                            };

#. Define ``<finalize>`` function with two arguments ``key`` and
   ``reducedValue``. The function modifies the ``reducedValue`` object
   to add another field ``average`` and returns the modified object.

   .. code-block:: javascript

      var finalizeFunction2 = function (key, reducedValue) {

                                  reducedValue.average = reducedValue.qty/reducedValue.count;

                                  return reducedValue;
                              };

#. Perform map-reduce on the ``orders`` collection using the
   ``mapFunction2``, the ``reduceFunction2``, and the
   ``finalizeFunction2`` functions. Use the ``query`` field to select
   only those documents with ``ord_date`` greater than ``new
   Date(01/01/2012)``. Output the results to a collection
   ``map_reduce_example``. If the ``map_reduce_example`` collection
   already exists, the operation will merge the existing contents with
   the results of this map-reduce operation:

   .. map-reduce-item-counts-avg-end
   .. map-reduce-item-counts-avg-wrapper-begin
   .. code-block:: javascript

      db.orders.mapReduce( mapFunction2,
                           reduceFunction2,
                           {
                             out: { merge: "map_reduce_example" }, 
                             query: { ord_date: { $gt: new Date('01/01/2012') } }, 
                             finalize: finalizeFunction2
                           }
                         )

   .. map-reduce-item-counts-avg-wrapper-end
   .. map-reduce-item-counts-avg-cmd-begin
   .. code-block:: javascript

      db.runCommand(
                     {
                       mapreduce: 'orders',
                       map: mapFunction2,
                       reduce: reduceFunction2,
                       finalize: finalizeFunction2,
                       out: { merge: "map_reduce_example" }, 
                       query: { ord_date: { $gt: new Date('01/01/2012') } },
                     }
                   )

   .. map-reduce-item-counts-avg-cmd-end

.. map-reduce-examples-end
