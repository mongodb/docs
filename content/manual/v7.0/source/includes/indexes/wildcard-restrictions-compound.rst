:ref:`Compound wildcard indexes <wildcard-index-compound>` have the
following restrictions:

- A compound wildcard index can only have one wildcard term.

  For example, you cannot specify the following index:

  .. code-block:: javascript
     :copyable: false

     { userID: 1, "object1.$**": 1, "object2.$**": 1 }

- The non-wildcard terms in a compound wildcard index must be single key
  terms. :ref:`Multikey <index-type-multikey>` index terms are not
  permitted.

- You can only specify the ``wildcardProjection`` option when the
  wildcard field is ``$**``. You cannot use ``wildcardProjection`` when
  you specify a field path for the wildcard index term.

  This is a valid definition: 

  .. code-block:: javascript

     {
        key: { "$**": 1 },
        name: "index_all_with_projection",
        wildcardProjection: {
           "someFields.name": 1,
           "otherFields.values": 1
        }
     }

  This is an invalid definition: 
  
  .. code-block:: javascript
     :copyable: false

     {
        key: { "someFields.$**": 1 },
        name: "invalid_index",
        wildcardProjection: {
           "someFields.name": 1,
           "otherFields.values": 1
        }
     }

- The ``_id`` field is omitted by default. If you need the ``_id``
  field:
  
  - Specify a wildcard index as ``$**``.
  - Include the ``_id`` field in the ``wildcardProjection`` with ``_id:
    1``.

  .. code-block:: javascript
   
     db.studentGrades.createIndex(
        {
           "$**": 1,
        },
        { 
           wildcardProjection: {
              _id: 1,
              exams: 1, 
              extraCredit: 1
           }
        }
     )

- You cannot include the same field in the wildcard fields and the
  regular fields. To exclude fields from the wildcard pattern, use a
  ``wildcardProjection`` with exclusion rules.

  .. code-block:: javascript
   
     db.studentGrades.createIndex(
        {
           exams: 1,
           "$**": 1,
           homeworks: 1
        },
        { 
           wildcardProjection: {
              exams: 0, 
              homeworks: 0
           }
        }
     )

wildcardProjection Validation Rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Starting in MongoDB 7.0.29, stricter validation rules apply to
``wildcardProjection`` in compound wildcard indexes to prevent invalid
configurations.

Existing indexes that do not meet the new validation requirements
continue to function, but you cannot create new indexes that don't meet
these requirements.

When using ``wildcardProjection`` with compound wildcard indexes, the
following rules apply:

.. list-table::
   :header-rows: 1
   :widths: 33 33 34

   * - Rule
     - Valid Example
     - Invalid Example

   * - If you specify a ``wildcardProjection``, it cannot be empty.
     - .. code-block:: javascript
          :copyable: false

          { productId: 1, "$**": 1 },
          {
            wildcardProjection: {
              attributes: 1
            }
          }
     - .. code-block:: javascript
          :copyable: false

          { productId: 1, "$**": 1 },
          {
            wildcardProjection: { }
          }

   * - You can only combine inclusions and exclusions in a
       ``wildcardProjection`` if the included or excluded field is
       ``_id``. You can exclude ``_id`` in inclusion projections or
       include ``_id`` in exclusion projections.
     - .. code-block:: javascript
          :copyable: false

          { "$**": 1, category: 1 },
          {
            wildcardProjection: {
              _id: 0,
              attributes: 1
            }
          }

       .. code-block:: javascript
          :copyable: false   

          { "$**": 1, category: 1 },
          {
            wildcardProjection: {
              _id: 1,
              metadata: 0
            }
          }
     - .. code-block:: javascript
          :copyable: false

          { "$**": 1, category: 1 },
          {
            wildcardProjection: {
              _id: 0,
              price: 0,
              stock: 1
            }
          }

   * - The fields included in the ``wildcardProjection`` must not
       overlap with any regular (non-wildcard) index fields.
     - .. code-block:: javascript
          :copyable: false

          { userId: 1, "$**": 1 },
          {
            wildcardProjection: {
              preferences: 1
            }
          }
          
     - .. code-block:: javascript
          :copyable: false

          { userId: 1, "$**": 1 },
          {
            wildcardProjection: {
              userId: 1
            }
          }

   * - You can only specify an ``_id``-only exclusion if the regular
       index field is also ``_id``.
     - .. code-block:: javascript
          :copyable: false

          { _id: 1, "$**": 1 },
          {
            wildcardProjection: {
              _id: 0
            }
          }
     - .. code-block:: javascript
          :copyable: false

          { productId: 1, "$**": 1 },
          {
            wildcardProjection: {
              _id: 0
            }
          }

   * - If the ``wildcardProjection`` is an exclusion, it must exclude
       all regular index fields.
     - .. code-block:: javascript
          :copyable: false

          {
            userId: 1,
            category: 1,
            "$**": 1
          },
          {
            wildcardProjection: {
              userId: 0,
              category: 0
            }
          }
     - .. code-block:: javascript
          :copyable: false

          {
            userId: 1,
            category: 1,
            "$**": 1
          },
          {
            wildcardProjection: {
              userId: 0
            }
          }
     