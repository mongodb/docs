``John`` has the ``Marketing``, ``Operations``, and ``Development``
roles, and sees these documents:

.. code-block:: javascript
   :copyable: false

   [
      {
         _id: 0,
         allowedRoles: [ 'Marketing' ],
         comment: 'For marketing team',
         yearlyBudget: 15000
      },
      {
         _id: 2,
         allowedRoles: [ 'Operations' ],
         comment: 'For operations team',
         yearlyBudget: 19000,
         cloudBudget: 12000
      },
      {
         _id: 3,
         allowedRoles: [ 'Development' ],
         comment: 'For development team',
         yearlyBudget: 27000
      }
   ]
