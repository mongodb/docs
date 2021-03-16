|service| limits the :manual:`privilege actions 
</reference/privilege-actions>` available from the built-in
:ref:`database user privileges <atlas-user-privileges>`.

.. example::

   The :dbcommand:`killAllSessions` command requires the 
   :authaction:`killAnySession` privilege. The built-in 
   :ref:`database user privileges <atlas-user-privileges>` do not 
   include :authaction:`killAnySession`.
   