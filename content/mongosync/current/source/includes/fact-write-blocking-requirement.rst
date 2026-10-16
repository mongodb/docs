The ``mongosync`` user must have
a role that includes the :authaction:`setUserWriteBlockMode` and
:authaction:`bypassWriteBlockingMode` ActionTypes. To grant these
actions, create a custom role that includes them and assign the custom
role to the user. To learn how, see :ref:`c2c-conn-onprem2atlas`.

.. note::

   Write blocking only applies to users that do not have the
   :authaction:`bypassWriteBlockingMode` ActionType. Users who
   have this ActionType can perform writes.
