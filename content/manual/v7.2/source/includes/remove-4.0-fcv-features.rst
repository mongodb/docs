Remove all persisted features that are :ref:`incompatible
<4.0-compatibility-enabled>` with 4.0. For example, if you have defined
any view definitions, document validators, and partial index filters
that use 4.0 query features such as the :ref:`aggregation convert
operators <4.0-agg-type-conversion>`, you must remove them.

If you have users with only ``SCRAM-SHA-256`` credentials, you should
create ``SCRAM-SHA-1`` credentials for these users before downgrading.
To update a user who only has ``SCRAM-SHA-256`` credentials, run
:method:`db.updateUser()` with ``mechanisms`` set to ``SCRAM-SHA-1``
only and the ``pwd`` set to the password:

.. code-block:: javascript

   db.updateUser(
      "reportUser256",
      {
        mechanisms: [ "SCRAM-SHA-1" ],
        pwd: <newpwd>
      }
   )

