.. include:: /includes/intro-start-api-example-intro.rst

``cluster0`` contains the ``students``, ``staff``, and ``prospects``
databases.

- The ``students`` database contains the ``undergrad``, ``graduate``, and
  ``adjuncts`` collections.
- The ``staff`` database contains the ``employees`` and ``contractors``
  collections.

The ``includeNamespaces`` array in this example defines a filter on two
of the databases:

.. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/1.json
   :language: json

With this filter in place, ``mongosync`` syncs:

- The entire ``staff`` database
- The ``undergrad``, ``graduate``, and ``adjuncts`` collections in the
  ``students`` database

``mongosync`` does not sync any information from the ``prospects``
database.

Adding a Collection
```````````````````

``mongosync`` syncs the entire ``staff`` database. If you add new
collections to the ``staff`` database, ``mongosync`` syncs them too.

``mongosync`` does not sync new collections that are added to
the ``students`` database unless the collection is a part of the filter.

For example, ``mongosync`` does not sync the new collection if you add
the ``postdocs`` collection to the ``students`` database. If you add the
``adjuncts`` collection, ``mongosync`` syncs it since ``adjuncts`` is
part of the filter.


Renaming a Collection
`````````````````````

You can rename any collection in the ``staff`` database. 

.. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/2.js
   :language: javascript

You can only rename a collection within the ``students`` database if the
new and old names are both in the filter. If either of the names is not
in the filter, ``monogsync`` reports an error and exits.

.. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/3.js
   :language: javascript

If a collection is specified in the filter, you can drop it, but you
cannot rename it to remove it from the filter.

.. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/4.js
   :language: javascript
   :copyable: false

When the whole target database is included in the filter, you can rename
collections to add them to the filter: 

- Source collection is specified in the filter

  .. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/5.js
     :language: javascript

- Source collection is not specified in the filter

  .. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/6.js
     :language: javascript

You can also rename collections in the source database when the whole
target database is in the filter:

.. literalinclude:: /code-examples/includes/example-filter-collection-with-renaming/7.js
   :language: javascript

.. important::

   If you anticipate renaming collections, consider adding the entire
   database to the filter rather than specifying individual collections.

