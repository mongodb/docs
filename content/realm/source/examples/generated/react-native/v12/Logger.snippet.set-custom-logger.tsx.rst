.. code-block:: typescript

   Realm.setLogger((level, message) => {
     const log = {
       message,
       level,
     };

     setLogs(previousLogs => [...previousLogs, log]);
   });
