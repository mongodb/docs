.. important::

   Shell methods which reset the connection cause a termination of all
   open :manual:`sessions </reference/server-sessions>`. The following
   methods reset the connection:

   ``db.auth``
   ``Mongo.setReadPref``
   ``Mongo.setReadConcern``
