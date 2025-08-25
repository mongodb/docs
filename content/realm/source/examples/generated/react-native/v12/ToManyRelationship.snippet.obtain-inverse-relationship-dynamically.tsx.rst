.. code-block:: typescript

   const getLinkedManufacturer = (car: LinkedCar): string => {
     const manufacturer = car.linkingObjects<ToManyManufacturer>(
       'ToManyManufacturer',
       'cars',
     )[0];

     // Returns 'Nissan', as only one manufacturer is linked
     // to this car object.
     return manufacturer.name;
   };
