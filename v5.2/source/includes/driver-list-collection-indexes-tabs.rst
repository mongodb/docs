.. tabs-drivers::

   .. tab::
      :tabid: shell

      List all Indexes on a Collection
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      To return a list of all indexes on a collection, use the
      :method:`db.collection.getIndexes()` method or a similar
      :api:`method for your driver <>`.

      For example, to view all indexes on the ``people`` collection,
      run the following command:

      .. code-block:: javascript

         db.people.getIndexes()