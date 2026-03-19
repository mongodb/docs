MongoDB sorts the ``input`` array based on the  ``sortBy`` value. The following
table provides examples of different sort options:

.. list-table::
   :header-rows: 1
   :widths: 40 20 40

   * - ``input``
     - ``sortBy`` 
     - Sorted ``input``

   * -
       .. code-block:: javascript
          :copyable: false
   
          [ 8, 3, 1, 10]
     - ``1``
     -
       .. code-block:: javascript
          :copyable: false
   
          [1, 3, 8, 10]

   * -
       .. code-block:: javascript
          :copyable: false
          
          [ 8, 3, 1, 10]
     - ``-1``
     -
       .. code-block:: javascript
          :copyable: false
   
          [10, 8, 3, 1]

   * -
       .. code-block:: javascript
          :copyable: false

          [
            { a: 1, b: 1 },
            { a: 2, b: 2 },
            { a: 2, b: 1 }
          ]
     - ``{ a: 1, b: 1 }``
     -
       .. code-block:: javascript
          :copyable: false

          [
            { a: 1, b: 1 },
            { a: 2, b: 1 },
            { a: 2, b: 2 }
          ]

