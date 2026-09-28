.. start-map

Requirements for the ``map`` Function
-------------------------------------

The ``map`` function is responsible for transforming each input document into
zero or more documents. It can access the variables defined in the ``scope``
parameter, and has the following prototype:

.. code-block:: javascript

   function() {
      ...
      emit(key, value);
   }

The ``map`` function has the following requirements:

- In the ``map`` function, reference the current document as ``this``
  within the function.

- The ``map`` function should *not* access the database for any reason.

- The ``map`` function should be pure, or have *no* impact outside of
  the function (i.e. side effects.)

- The ``map`` function may optionally call ``emit(key,value)`` any number of
  times to create an output document associating ``key`` with ``value``.

The following ``map`` function will call ``emit(key,value)`` either
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

.. end-map

.. start-reduce

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

- MongoDB can invoke the ``reduce`` function more than once for the
  same key. In this case, the previous output from the ``reduce``
  function for that key will become one of the input values to the next
  ``reduce`` function invocation for that key.

- The ``reduce`` function can access the variables defined
  in the ``scope`` parameter.

- The inputs to ``reduce`` must not be larger than half of MongoDB's
  :ref:`maximum BSON document size <limit-bson-document-size>`. This
  requirement may be violated when large documents are returned and then
  joined together in subsequent ``reduce`` steps.

Because it is possible to invoke the ``reduce`` function
more than once for the same key, the following
properties need to be true:

- the *type* of the return object must be **identical**
  to the type of the ``value`` emitted by the ``map``
  function.

- the ``reduce`` function must be *associative*. The following statement must be
  true:

  .. code-block:: javascript

     reduce(key, [ C, reduce(key, [ A, B ]) ] ) == reduce( key, [ C, A, B ] )

- the ``reduce`` function must be *idempotent*. Ensure
  that the following statement is true:

  .. code-block:: javascript

     reduce( key, [ reduce(key, valuesArray) ] ) == reduce( key, valuesArray )

- the ``reduce`` function should be *commutative*: that is, the order of the
  elements in the ``valuesArray`` should not affect the output of the
  ``reduce`` function, so that the following statement is true:

  .. code-block:: javascript

     reduce( key, [ A, B ] ) == reduce( key, [ B, A ] )

.. end-reduce

.. start-out

``out`` Options
---------------

You can specify the following options for the ``out`` parameter:

Output to a Collection
~~~~~~~~~~~~~~~~~~~~~~

This option outputs to a new collection, and is not available on secondary
members of replica sets.

.. code-block:: javascript

   out: <collectionName>

Output to a Collection with an Action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

   .. include:: /includes/extracts/4.2-changes-map-reduce-deprecation.rst

This option is only available when passing a collection that
already exists to ``out``. It is not available 
on secondary members of replica sets.

.. code-block:: javascript

   out: { <action>: <collectionName>
           [, db: <dbName>]
           [, sharded: <boolean> ] }

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

  Optional. The name of the database that you want the map-reduce
  operation to write its output. By default this will be the same
  database as the input collection.

Output Inline
~~~~~~~~~~~~~~

Perform the map-reduce operation in memory and return the result. This
option is the only available option for ``out`` on secondary members of
replica sets.

.. code-block:: javascript

   out: { inline: 1 }

The result must fit within the :ref:`maximum size of a BSON document
<limit-bson-document-size>`.

.. end-out

.. start-finalize

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

.. end-finalize
