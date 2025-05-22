:ref:`Compound wildcard indexes <wildcard-index-compound>` have the
following restrictions:

- A compound wildcard index can only have one wildcard term.

  For example, you cannot specify the following index:

  .. code-block:: javascript
     :copyable: false

     { userID: 1, "object1.$**": 1, "object2.$**": 1 }


- The non-wildcard terms in a ``compound wildcard index`` must be single
  key terms. :ref:`Multikey <index-type-multikey>` index terms are not
  permitted.

- The ``wildcardProjection`` option is only valid when the wildcard
  field is ``$**``. You cannot use ``wildcardProjection`` when you
  specify a field path for the wildcard index term. 

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
  
  - Specify a wildcard index as ``$**``
  - Use a ``wildcardProjection``
  - Specify the ``_id`` field

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
  regular fields. You can use a ``wildcardProjection`` to exclude fields
  from the wildcard pattern.

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
     