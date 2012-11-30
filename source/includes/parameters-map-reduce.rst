:param map:

       A JavaScript function that associates or "maps" a value with a
       key.

       The ``map`` function has the following prototype:

       .. code-block:: javascript

          function() {
             ...
             emit(key, value);
          }

       The ``map`` function process every input document for the
       map-reduce operation. All the ``key`` and ``value`` pairs
       emitted by the map function. In map-reduce operations, the
       operation groups the output from the map phase by the ``key``
       value and passes these groupings to the ``reduce`` function.

       .. note::

          - In the ``map`` function, reference the current document as
            ``this`` within the function.

          - The ``map`` function should *not* access the database for
            any reason.

          - The ``map`` function should be pure, or have *no* impact
            outside of the function (i.e. side effects.)

          - The ``emit(key,value)`` function associates the ``key``
            with a ``value``.

            - A single emit can only hold half of MongoDB's :ref:`maximum
              BSON document size <limit-bson-document-size>`.

            - There is no limit to the number of times you may call the
              ``emit`` function per document.

          - The ``map`` function can access the variables defined in
            the ``scope`` parameter.

:param reduce:

       A JavaScript function that "reduces" to a single object all the
       ``values`` associated with a particular ``key``.

       The ``reduce`` function has the following prototype:

       .. code-block:: javascript

          function(key, values) {
             ...
             return result;
          }

       The ``reduce`` function accepts ``key`` and ``values``
       arguments. The elements of the ``values`` array are the
       individual ``value`` objects emitted by the ``<map>`` function,
       grouped by the ``key``.

       .. note::

          - The ``reduce`` function should *not* access the database,
            even to perform read operations.

          - The ``reduce`` function should *not* affect the outside
            system.


          - Because it is possible to invoke the ``reduce`` function
            more than once for the same key, the following three
            properties need to be true:

            a. the *type* of the return object must be **identical**
               to the type of the ``value`` emitted by the ``<map>``
               function to ensure that the following operations is
               true:

               .. code-block:: javascript

                  reduce(key, [ C, reduce(key, [ A, B ]) ] ) == reduce (key, [ C, A, B ] )

            #. the ``reduce`` function must be *idempotent*. Ensure
               that the following statement is true:

               .. code-block:: javascript

                  reduce( key, [ reduce(key, valuesArray) ] ) == reduce ( key, valuesArray )

            #. the order of the elements in the
               ``valuesArray`` should not affect the output of the
               ``reduce`` function, so that the following statement is
               true:

               .. code-block:: javascript

                  reduce ( key, [ A, B ] ) == reduce ( key, [ B, A ] )

          - MongoDB will **not** call the ``reduce`` function for a key
            that has only a single value.

          - The ``reduce`` function can access the variables defined
            in the ``scope`` parameter.

:param out:

       .. versionadded: 1.8

       Specifies the location of the result of the map-reduce
       operation. You may output to a collection when performing map
       reduce operations on the primary members of the set, on
       :term:`secondary` members you may only use the ``inline``
       output.

       You can specify the following options for the ``out`` parameter:

       - **Output to a collection**.

         .. code-block:: javascript

            { out: <collectionName> }

       - **Output to a collection and specify one of the following
         actions**. This option is only available when passing ``out``
         a collection that already exists. This option is not
         available on secondary members of replica sets.

         .. code-block:: none

            { out: { <action>: <collectionName>[, db: <dbName>][, sharded: <boolean> ][, nonAtomic: <boolean> ] } }

         - ``<action>``: Specify one of the following actions:

            - ``replace``

              .. code-block:: none

                 { out: { replace: <collectionName> } }

              Replace the contents of the ``<collectionName>`` if the
              collection with the ``<collectionName>`` exists.

            - ``merge``

              .. code-block:: none

                 { out: { merge: <collectionName> } }

              Merge the new result with the existing result if the
              output collection already exists. If an existing document
              has the same key as the new result, *overwrite* that
              existing document.

            - ``reduce``

              .. code-block:: none

                 { out: { reduce: <collectionName> } }

              Merge the new result with the existing result if the
              output collection already exists. If an existing document
              has the same key as the new result, apply the ``<reduce>``
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

           .. versionadded:: 2.1

           Optional. Specify output operation as non-atomic and is
           valid *only* for ``merge`` and ``reduce`` output modes.

           If ``nonAtomic`` is ``true``, the post-processing step will
           prevent MongoDB from locking the database; however, other
           clients will be able to read intermediate states of the
           output database. Otherwise the map reduce operation must
           lock the database during post-processing.

       - **Output inline**. Perform the map-reduce operation in memory
         and return the result. This option is the only available
         option for ``out`` on secondary members of replica sets.

         .. code-block:: javascript

            { out: { inline: 1 } }

         The result must fit within the :ref:`maximum size of a BSON
         document <limit-bson-document-size>`.

:param query:

       Optional. Specifies the selection criteria using :doc:`query
       operators </reference/operators>` for determining the documents
       input to the ``map`` function.

:param sort:

       Optional. Sorts the *input* documents. This option is useful for
       optimization. For example, specify the sort key to be the same
       as the emit key so that there are fewer reduce operations.

:param limit:

       Optional. Specifies a maximum number of documents to return from
       the collection.

:param finalize:

       Optional. A JavaScript function that follows the ``<reduce>``
       method and modifies the output and has the following prototype:

       .. code-block:: javascript

          function(key, reducedValue) {
             ...
             return modifiedObject;
          }

       The ``<finalize>`` function receives as its arguments a ``key``
       value and the ``reducedValue`` from the ``<reduce>`` function.

       .. note::

          - The ``finalize`` function should *not* access the database for
            any reason.

          - The ``finalize`` function should be pure, or have *no* impact
            outside of the function (i.e. side effects.)

          - The ``finalize`` function can access the variables
            defined in the ``scope`` parameter.

:param document scope:

       Optional. Specifies global variables that are accessible in the
       ``map`` , ``reduce`` and the ``finalize`` functions.

:param Boolean jsMode:

       .. versionadded: 2.0

       Optional. Specifies whether to convert intermediate data into
       BSON format between the execution of the ``map`` and ``reduce``
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

       Optional. Specifies whether to include the ``timing``
       information in the result information. The ``verbose``
       defaults to ``true`` to include the ``timing`` information.
