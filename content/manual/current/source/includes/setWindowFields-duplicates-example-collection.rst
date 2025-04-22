Create a ``cakeSalesWithDuplicates`` collection where:

- Cake sales are placed in the state of California (``CA``) and
  Washington (``WA``).

- Documents 6 to 8 have the same ``quantity`` and ``state`` as document
  5.

- Document 9 has the same ``quantity``  and ``state`` as document 4.

- Document 10 has a ``null`` ``quantity``.

- Document 11 is missing the ``quantity``.

.. code-block:: javascript

   db.cakeSalesWithDuplicates.insertMany( [
      { _id: 0, type: "chocolate", orderDate: new Date("2020-05-18T14:10:30Z"),
        state: "CA", price: 13, quantity: 120 },
      { _id: 1, type: "chocolate", orderDate: new Date("2021-03-20T11:30:05Z"),
        state: "WA", price: 14, quantity: 140 },
      { _id: 2, type: "vanilla", orderDate: new Date("2021-01-11T06:31:15Z"),
        state: "CA", price: 12, quantity: 145 },
      { _id: 3, type: "vanilla", orderDate: new Date("2020-02-08T13:13:23Z"),
        state: "WA", price: 13, quantity: 104 },
      { _id: 4, type: "strawberry", orderDate: new Date("2019-05-18T16:09:01Z"),
        state: "CA", price: 41, quantity: 162 },
      { _id: 5, type: "strawberry", orderDate: new Date("2019-01-08T06:12:03Z"),
        state: "WA", price: 43, quantity: 134 },
      { _id: 6, type: "strawberry", orderDate: new Date("2020-01-08T06:12:03Z"),
        state: "WA", price: 41, quantity: 134 },
      { _id: 7, type: "strawberry", orderDate: new Date("2020-01-01T06:12:03Z"),
        state: "WA", price: 34, quantity: 134 },
      { _id: 8, type: "strawberry", orderDate: new Date("2020-01-02T06:12:03Z"),
        state: "WA", price: 40, quantity: 134 },
      { _id: 9, type: "strawberry", orderDate: new Date("2020-05-11T16:09:01Z"),
        state: "CA", price: 39, quantity: 162 },
      { _id: 10, type: "strawberry", orderDate: new Date("2020-05-11T16:09:01Z"),
        state: "CA", price: 39, quantity: null },
      { _id: 11, type: "strawberry", orderDate: new Date("2020-05-11T16:09:01Z"),
        state: "CA", price: 39 }
   ] )