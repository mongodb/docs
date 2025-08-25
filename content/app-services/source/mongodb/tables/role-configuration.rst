.. code-block:: json
   
   {
      "name": "<Role Name>",
      "apply_when": { Expression },
      "document_filters": {
        "read": { Expression },
        "write": { Expression }
      },
      "read": { Expression },
      "write": { Expression },
      "insert": { Expression },
      "delete": { Expression },
      "search": <Boolean>,
      "fields": {
         "<Field Name>": {
            "read": { Expression },
            "write": { Expression },
            "fields": { Embedded Fields }
         },
         ...
      },
      "additional_fields": {
        "read": { Expression },
        "write": { Expression }
      }
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description

   * - | ``name``
       | ``string``
     - The name of the role. Role names identify and distinguish between
       roles in the same collection. Limited to 100 characters or fewer.

   * - | ``apply_when``
       | ``object``
     - An :ref:`expression <expressions>` that evaluates to true when
       this :ref:`role <roles>` applies to a user.

       When Device Sync (Flexible Mode) is not enabled, App Services assigns a
       role on a per-document basis. When Device Sync (Flexible Mode) is
       enabled, App Services assigns roles on a per-collection, per-session
       basis -- that is, for each synced collection when a client opens a sync
       connection.

       To assign a role, App Services evaluates the ``apply_when`` of each
       potential role until one evaluates to true. Potential roles are any roles
       specified in the ``rules.json`` configuration file for the given
       collection or, if no ``rules.json`` file is found for the given
       collection, the default role(s). App Services evaluates roles in the
       order that you specify them in your configuration. If no role matches,
       then access is denied. For more information, see :ref:`roles`.

       If Device Sync (Flexible Mode) is enabled, the assigned roles must be
       :ref:`Sync compatible <sync-compatible-roles>`. If the role is not Sync
       compatible, but its ``apply_when`` evaluated to true, others roles are
       not considered; access is denied.

   * - | ``document_filters``
       | Document
       | *Default:* ``undefined``
     - A document with read and write expressions that determine whether
       the role's other permissions may be evaluated.
       
       If Device Sync is enabled, both ``document_filters.read`` and
       ``document_filters.write`` **must** be defined to make the role
       :ref:`Sync compatible <sync-compatible-roles>`. Sync incompatible roles
       deny all access to Sync requests.
       
       If Device Sync is not enabled, ``document_filters``,
       ``document_filters.read``, and ``document_filters.write`` are all
       optional; an undefined ``document_filters.read`` or
       ``document_filters.write`` defaults to true, allowing subsequent
       permissions to be evaluated.

       .. code-block:: json

          "document_filters": {
            "read": { Expression },
            "write": { Expression }
          }

   * - | ``document_filters.read``
       | ``object?``
       | *Default:* ``undefined``
     - An :ref:`expression <expressions>` that specifies whether ``read``, read
       permissions in ``fields``, and read permissions in ``additional_fields``
       may be evaluated. If false (and ``document_filters.write`` is undefined
       or false), read access is denied for the entire document.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be defined and may only reference :ref:`queryable fields
       <queryable-fields>`.

   * - | ``document_filters.write``
       | ``object?``
       | *Default:* ``undefined``
     - An :ref:`expression <expressions>` that specifies whether ``write``,
       write permissions in ``fields``, and write permissions in
       ``additional_fields`` may be evaluated. If false, then write access is
       denied for the entire document.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be defined and may only reference :ref:`queryable fields
       <queryable-fields>`.

   * - | ``read``
       | ``object?``
       | *Default:* ``undefined``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to read all fields in the document.
       
       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be a boolean literal (either ``true`` or ``false``).

       Document-level read permissions take priority over any field-level
       permissions. If a role has document-level ``read`` permissions, it
       applies to all fields in the document. Read permissions specified by
       ``fields`` or ``additional_fields`` do not override document-level
       ``read`` permissions.
       
       To define a default fallback alongside field-level rules, leave ``read``
       undefined and use ``additional_fields``.

   * - | ``write``
       | ``object?``
       | *Default:* ``undefined``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to add, modify, or remove all fields in the document.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be a boolean literal (either ``true`` or ``false``).

       Document-level write permissions take priority over any field-level
       permissions. If a role has document-level ``write`` permissions, it
       applies to all fields in the document. Write permissions specified by
       ``fields`` or ``additional_fields`` do not override document-level
       ``write`` permissions.
       
       To define a default fallback alongside field-level rules, leave ``write``
       undefined and use ``additional_fields``.
       
       You can use expansions like :json-expansion:`%%root` and
       :json-expansion:`%%prevRoot` in ``write`` JSON expressions.

       .. important:: Implicit Read Permission

          Any time a role has ``write`` permission for a particular
          scope it also has ``read`` permission even if that is not
          explicitly defined.

   * - | ``insert``
       | ``object?``
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to
       ``true`` if the role has permission to insert a new document into the
       collection.
       
       App Services only evaluates this expression for insert operations and
       only after determining that the role has ``write`` permission for all
       fields in the new document.

   * - | ``delete``
       | ``object?``
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to delete a document from the collection.

       App Services only evaluates this expression for delete operations and
       only after determining that the role has ``write`` permission for all
       fields in the document to be deleted.

   * - | ``search``
       | Boolean
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to search the collection using :atlas:`Atlas Search
       </atlas-search/>`.

       .. include:: /includes/note-atlas-search-rules.rst

   * - | ``fields``
       | Document
       | *Default:* ``{}``
     - |

       A document where each key corresponds to a field name, and each value
       defines the role's field-level ``read`` and ``write`` permissions for the
       corresponding field in a queried document.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the inner
       ``read`` and ``write`` expressions must be boolean literals (either
       ``true`` or ``false``).

       .. code-block:: json

          "fields": {
            "<Field Name>": {
               "read": { Expression },
               "write": { Expression },
               "fields": <Fields Document>
            },
            ...
          }

       .. note:: Permission Priority
          
          Document-level ``read`` or ``write`` permissions override all
          field-level permissions of the same type. If permissions are
          defined for a field that contains an embedded document, those
          permissions override any permissions defined for the
          document's embedded fields.

   * - | ``fields.<Field Name>.read``
       | ``object?``
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to read the field.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be a boolean literal (either ``true`` or ``false``).

   * - | ``fields.<Field Name>.write``
       | ``object?``
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to add, modify, or remove the field.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be a boolean literal (either ``true`` or ``false``).

   * - | ``fields.<Field Name>.fields``
       | Document
       | *Default:* ``{}``
     - A ``fields`` document that defines ``read`` and ``write``
       permissions for fields that are embedded within this field in a
       queried document.

       See the :ref:`Field-level Permissions for Embedded Documents
       <role-template-embedded-documents>` role pattern for more
       information.

   * - | ``additional_fields``
       | Document
       | *Default:* ``{}``
     - A document that defines the role's field-level ``read`` and
       ``write`` permissions for any fields in a queried document that
       don't have explicitly defined permissions in the ``fields``
       document.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       inner ``read`` and ``write`` expressions must be boolean literals (either
       ``true`` or ``false``).

       .. code-block:: json

          "additional_fields": {
            "read": { Expression },
            "write": { Expression }
          }

   * - | ``additional_fields.read``
       | ``object?``
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to read any field that does not have a field-level
       permission definition in ``fields``.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be boolean (either ``true`` or ``false``).

   * - | ``additional_fields.write``
       | ``object?``
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to true if the
       role has permission to add, modify, or remove any field that does not
       have a field-level permission definition in ``fields``.

       To maintain :ref:`Sync compatibility <sync-compatible-roles>`, the
       expression must be boolean (either ``true`` or ``false``).
