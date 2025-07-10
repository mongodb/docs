.. example::

   The following filter function only renders data where the
   ``ownerId`` field of a document matches the value of
   the Embedding Authentication Provider's token's ``sub`` field:

   .. code-block:: javascript

      function getFilter(context) {
        return { ownerId: context.token.sub };
      }
