.. important:: |cmd-name| will rebuild indexes in the :ref:`background
   <index-creation-background>` *if the index was originally specified
   with this option*. However, |cmd-name| will rebuild the ``_id``
   index in the foreground, which takes the database's write lock.
