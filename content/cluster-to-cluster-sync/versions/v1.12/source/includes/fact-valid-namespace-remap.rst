
The following restrictions apply to namespace remapping:

- Namespace remapping doesn't permit writing to the ``system``, ``config``, ``admin``,
  or ``local`` databases, or writing to internal databases used by ``mongosync``.

- The database name on the destination cluster must be valid under Windows
  restrictions.

  For more information, see :limit:`Restrictions on Database Names for Windows`.

- Remapped database names on the destination cluster cannot differ only in case.

- You can't specify a namespace remap and set the ``reversible`` flag to
  ``true``.

- The remap cannot produce namespace conflicts on the destination cluster.

  For example:

  .. code-block:: javascript
     :copyable: false

     "namespaceRemap": [
       {
          "from": { "database": "us-west" },
          "to": {"database": "us-accounts" }
       },
       {
          "from": { "database": "us-south" },
          "to": { "database": "us-accounts" }
       }
     ]

  If each database on the source cluster contains a ``texas`` collection,
  ``mongosync`` may fail, corrupt data, or exhibit unexpected behavior.