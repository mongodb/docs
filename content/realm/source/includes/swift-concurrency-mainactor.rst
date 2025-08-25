.. tip::

   If your app accesses Realm in an ``async/await`` context, mark the code 
   with ``@MainActor`` to avoid threading-related crashes.