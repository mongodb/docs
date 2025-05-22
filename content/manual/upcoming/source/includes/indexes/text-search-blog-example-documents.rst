Create a ``blog`` collection with the following documents:

.. code-block:: javascript

   db.blog.insertMany( [
      {
        _id: 1,
        content: "This morning I had a cup of coffee.",
        about: "beverage",
        keywords: [ "coffee" ]
      },
      {
        _id: 2,
        content: "Who likes chocolate ice cream for dessert?",
        about: "food",
        keywords: [ "poll" ]
      },
      {
        _id: 3,
        content: "My favorite flavors are strawberry and coffee",
        about: "ice cream",
        keywords: [ "food", "dessert" ]
      }
   ] )
