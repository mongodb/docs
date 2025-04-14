.. warning:: 

   Avoid deploying more than one :term:`arbiter` in a :term:`replica
   set`. See :ref:`rollbacks-multi-arbiters`.

To add an arbiter to an existing replica set:

- Typically, if there are two or fewer data-bearing members in the
  replica set, you might need to first set the :ref:`cluster wide write
  concern <set_global_default_write_concern>` for the replica set.

- See :ref:`cluster wide write concern
  <set_global_default_write_concern>` for more information on why you
  might need to set the cluster wide write concern.

You do not need to change the cluster wide write concern before starting
a new replica set with an arbiter.

.. seealso::

   :ref:`Default write concern formula <default-wc-formula>`
