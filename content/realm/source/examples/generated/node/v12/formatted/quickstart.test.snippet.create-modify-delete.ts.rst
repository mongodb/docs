.. code-block:: typescript

   const allTasks = realm.objects(QuickstartTask);

   // Add a couple of Tasks in a single, atomic transaction.
   realm.write(() => {
     realm.create(QuickstartTask, {
       _id: firstId,
       name: "go grocery shopping",
       status: "Open",
     });

     realm.create(QuickstartTask, {
       _id: secondId,
       name: "go exercise",
       status: "Open",
     });
   });

   const task1 = allTasks.find(
     (task) => task._id.toString() == firstId.toString()
   );
   const task2 = allTasks.find(
     (task) => task._id.toString() == secondId.toString()
   );

   realm.write(() => {
     // Modify an object.
     task1!.status = "InProgress";

     // Delete an object.
     realm.delete(task2!);
   });
