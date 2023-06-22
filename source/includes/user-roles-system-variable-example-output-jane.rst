``Jane`` has the ``Sales`` and ``Operations`` roles, and sees these
documents:

.. code-block:: javascript
   :copyable: false

   [
      {
         _id: 1,
         allowedRoles: [ 'Sales' ],
         comment: 'For sales team',
         yearlyBudget: 17000,
         salesEventsBudget: 1000
      },
      {
         _id: 2,
         allowedRoles: [ 'Operations' ],
         comment: 'For operations team',
         yearlyBudget: 19000,
         cloudBudget: 12000
      }
   ]
