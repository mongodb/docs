The following examples use the ``testScores`` collection. Create the
collection:

.. code-block:: javascript

   db.testScores.insertMany( [
      { studentId: "2345", test01: 62, test02: 81, test03: 80 },
      { studentId: "2356", test01: 60, test02: 83, test03: 79 },
      { studentId: "2358", test01: 67, test02: 82, test03: 78 },
      { studentId: "2367", test01: 64, test02: 72, test03: 77 },
      { studentId: "2369", test01: 60, test02: 53, test03: 72 }
   ] )

