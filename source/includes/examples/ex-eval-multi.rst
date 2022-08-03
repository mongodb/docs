To get a list of collections in the ``moviesDatabase``, use multiple
``--eval`` statements:

.. code-block:: javascript

   mongosh --quiet \
           --eval 'use moviesDatabase' \
           --eval 'show collections' \
           mongodb://localhost/

