.. include:: /includes/intro-start-api-example-intro.rst

``cluster0`` contains the ``sales``, ``marketing``, and
``engineering`` databases.

The ``sales`` database contains the ``EMEA``, ``APAC``, and ``AMER``
collections.

The ``includeNamespaces`` array in this example defines a filter on two
of the databases, ``sales`` and ``marketing``.

The ``sales`` database also filters on the ``EMEA`` and ``APAC``
collections. 

.. code-block:: javascript

   "includeNamespaces" : [
         {
             "database" : "sales",
             "collections": [ "EMEA", "APAC" ]
         },
         {
             "database" : "marketing"
         }
      ]

After you call the ``/start`` API with this filter in place,
``mongosync``:

- Syncs all of the collections in the ``marketing`` database
- Filters out the ``engineering`` database
- Syncs the ``EMEA`` and ``APAC`` collections from the ``sales``
  database
- Filters out the ``AMER`` collection

