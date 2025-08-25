.. note::

   Multiple notification tokens on the same object which filter for
   separate key paths *do not* filter exclusively. If one key path
   change is satisfied for one notification token, then all notification
   token blocks for that object will execute.