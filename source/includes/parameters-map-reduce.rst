:param map:

   A JavaScript function that associates or "maps" a ``value`` with a
   ``key`` and emits the ``key`` and value ``pair``.

   The ``map`` function processes every input document for the
   map-reduce operation. However, the ``map`` function can call emit
   any number of times, including 0, for each input document. The
   map-reduce operation groups the emitted ``value`` objects by the
   ``key`` and passes these groupings to the ``reduce`` function.
   See below for requirements for the ``map`` function.

:param reduce:

   A JavaScript function that "reduces" to a single object all the
   ``values`` associated with a particular ``key``.

   The ``reduce`` function accepts two arguments: ``key`` and
   ``values``. The ``values`` argument is an array whose elements are
   the ``value`` objects that are "mapped" to the ``key``.
   See below for requirements for the ``reduce`` function.


:param out:

   .. versionadded:: 1.8

   Specifies the location of the result of the map-reduce operation.
   You can output to a collection, output to a collection with an
   action, or output inline. You may output to a collection when
   performing map reduce operations on the primary members of the set;
   on :term:`secondary` members you may only use the ``inline`` output.

:param query:

   Optional. Specifies the selection criteria using :doc:`query
   operators </reference/operators>` for determining the documents
   input to the ``map`` function.

:param sort:

   Optional. Sorts the *input* documents. This option is useful for
   optimization. For example, specify the sort key to be the same as
   the emit key so that there are fewer reduce operations.

:param limit:

   Optional. Specifies a maximum number of documents to return from
   the collection.

:param finalize:

   Optional. A JavaScript function that follows the ``reduce``
   method and modifies the output.

   The ``finalize`` function receives two arguments: ``key`` and
   ``reducedValue``. The ``reducedValue`` is the value returned from
   the ``reduce`` function for the ``key``.

:param document scope:

   Optional. Specifies global variables that are accessible in the
   ``map`` , ``reduce`` and the ``finalize`` functions.

:param Boolean jsMode:

   .. versionadded:: 2.0

   Optional. Specifies whether to convert intermediate data into BSON
   format between the execution of the ``map`` and ``reduce``
   functions.

   If ``false``:

   - Internally, MongoDB converts the JavaScript objects emitted
     by the ``map``
     function to BSON objects. These BSON
     objects are then converted back to JavaScript objects when
     calling the ``reduce`` function.

   - The map-reduce operation places the intermediate BSON objects
     in temporary, on-disk storage. This allows the map-reduce
     operation to execute over arbitrarily large data sets.

   If ``true``:

   - Internally, the JavaScript objects emitted during ``map``
     function remain as JavaScript objects. There is no need to
     convert the objects for the ``reduce`` function, which
     can result in faster execution.

   - You can only use ``jsMode`` for result sets with fewer than
     500,000 distinct ``key`` arguments to the mapper's ``emit()``
     function.

   The ``jsMode`` defaults to false.

:param Boolean verbose:

   Optional. Specifies whether to include the ``timing`` information
   in the result information. The ``verbose`` defaults to ``true`` to
   include the ``timing`` information.

.. stop-parameters-here

Requirements for the ``map`` Function
-------------------------------------

The ``map`` function has the following prototype:

.. code-block:: javascript

   function() {
      ...
      emit(key, value);
   }

The ``map`` function exhibits the following behaviors:

- In the ``map`` function, reference the current document as ``this``
  within the function.

- The ``map`` function should *not* access the database for any reason.

- The ``map`` function should be pure, or have *no* impact outside of
  the function (i.e. side effects.)

- The ``emit(key,value)`` function associates the ``key`` with a
  ``value``.

  - A single emit can only hold half of MongoDB's :ref:`maximum BSON
    document size <limit-bson-document-size>`.

  - The ``map`` function can call ``emit(key,value)`` any number of
    times, including 0, per each input document.

    The following ``map`` function may call ``emit(key,value)`` either
    0 or 1 times depending on the value of the input document's
    ``status`` field:

    .. code-block:: javascript

       function() {
           if (this.status == 'A')
               emit(this.cust_id, 1);
       }

    The following ``map`` function may call ``emit(key,value)``
    multiple times depending on the number of elements in the input
    document's ``items`` field:

    .. code-block:: javascript

       function() {
           this.items.forEach(function(item){ emit(item.sku, 1); });
       }

- The ``map`` function can access the variables defined in the
  ``scope`` parameter.

Requirements for the ``reduce`` Function
----------------------------------------

The ``reduce`` function has the following prototype:

.. code-block:: javascript

   function(key, values) {
      ...
      return result;
   }

The ``reduce`` function exhibits the following behaviors:

- The ``reduce`` function should *not* access the database,
  even to perform read operations.

- The ``reduce`` function should *not* affect the outside
  system.

- MongoDB will **not** call the ``reduce`` function for a key
  that has only a single value.

- MongoDB can invoke the ``reduce`` function more than once for the
  same key. In this case, the previous output from the ``reduce``
  function for that key will become one of the input values to the next
  ``reduce`` function invocation for that key.

- The ``reduce`` function can access the variables defined
  in the ``scope`` parameter.

Because it is possible to invoke the ``reduce`` function
more than once for the same key, the following
properties need to be true:

- the *type* of the return object must be **identical**
  to the type of the ``value`` emitted by the ``map``
  function to ensure that the following operations is
  true:

  .. code-block:: javascript

     reduce(key, [ C, reduce(key, [ A, B ]) ] ) == reduce( key, [ C, A, B ] )

- the ``reduce`` function must be *idempotent*. Ensure
  that the following statement is true:

  .. code-block:: javascript

     reduce( key, [ reduce(key, valuesArray) ] ) == reduce( key, valuesArray )

- the order of the elements in the
  ``valuesArray`` should not affect the output of the
  ``reduce`` function, so that the following statement is
  true:

  .. code-block:: javascript

     reduce( key, [ A, B ] ) == reduce( key, [ B, A ] )


``out`` Options
---------------

You can specify the following options for the ``out`` parameter:

Output to a Collection
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

   out: <collectionName>

Output to a Collection with an Action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This option is only available when passing ``out`` a collection that
already exists. This option is not available on secondary members of
replica sets.

.. code-block:: javascript

  out: { <action>: <collectionName>
           [, db: <dbName>]
           [, sharded: <boolean> ]
           [, nonAtomic: <boolean> ] }

When you output to a collection with an action, the ``out`` has the
following parameters:

- ``<action>``: Specify one of the following actions:

  - ``replace``

    Replace the contents of the ``<collectionName>`` if the
    collection with the ``<collectionName>`` exists.

  - ``merge``

    Merge the new result with the existing result if the
    output collection already exists. If an existing document
    has the same key as the new result, *overwrite* that
    existing document.

  - ``reduce``

    Merge the new result with the existing result if the
    output collection already exists. If an existing document
    has the same key as the new result, apply the ``reduce``
    function to both the new and the existing documents and
    overwrite the existing document with the result.

- ``db``:

 Optional.The name of the database that you want the
 map-reduce operation to write its output. By default
 this will be the same database as the input collection.

- ``sharded``:

 Optional. If ``true`` *and* you have enabled sharding on
 output database, the map-reduce operation will shard the
 output collection using the ``_id`` field as the shard key.

- ``nonAtomic``:

  .. versionadded:: 2.2

  Optional. Specify output operation as non-atomic and is valid *only*
  for ``merge`` and ``reduce`` output modes which may take minutes to
  execute.

  If ``nonAtomic`` is ``true``, the post-processing step will prevent
  MongoDB from locking the database; however, other clients will be
  able to read intermediate states of the output collection. Otherwise
  the map reduce operation must lock the database during
  post-processing.

Output Inline
~~~~~~~~~~~~~~

Perform the map-reduce operation in memory and return the result. This
option is the only available option for ``out`` on secondary members of
replica sets.

.. code-block:: javascript

   out: { inline: 1 }

The result must fit within the :ref:`maximum size of a BSON document
<limit-bson-document-size>`.

Requirements for the ``finalize`` Function
------------------------------------------

The ``finalize`` function has the following prototype:

   .. code-block:: javascript

      function(key, reducedValue) {
         ...
         return modifiedObject;
      }

The ``finalize`` function receives as its arguments a ``key``
value and the ``reducedValue`` from the ``reduce`` function. Be
aware that:

- The ``finalize`` function should *not* access the database for
  any reason.

- The ``finalize`` function should be pure, or have *no* impact
  outside of the function (i.e. side effects.)

- The ``finalize`` function can access the variables defined in
  the ``scope`` parameter.
