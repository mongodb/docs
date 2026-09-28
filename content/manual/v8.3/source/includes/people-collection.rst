Create a sample collection named ``people`` with these documents:

.. code-block:: javascript

   db.people.insertMany( [
      { _id: 1, name: "Melissa", hobbies: [ "softball", "drawing", "reading" ] },
      { _id: 2, name: "Brad", hobbies: [ "gaming", "skateboarding" ] },
      { _id: 3, name: "Scott", hobbies: [ "basketball", "music", "fishing" ] },
      { _id: 4, name: "Tracey", hobbies: [ "acting", "yoga" ] },
      { _id: 5, name: "Josh", hobbies: [ "programming" ] },
      { _id: 6, name: "Claire" }
   ] )

The ``hobbies`` field contains an array of each person's hobbies in
ranked order. The first hobby in the array is the person's primary hobby
that the person spends the most time on. The first hobby has an array
index of ``0``.
