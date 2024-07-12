- :group:`$rank` and :group:`$denseRank` differ in how they rank duplicate
  :ref:`sortBy <setWindowFields-sortBy>` field values. For example, with
  :ref:`sortBy <setWindowFields-sortBy>` field values of 7, 9, 9, and 10:

  - :group:`$denseRank` ranks the values as 1, 2, 2, and 3. The
    duplicate 9 values have a rank of 2, and 10 has a rank of 3. There is
    no gap in the ranks.

  - :group:`$rank` ranks the values as 1, 2, 2, and 4. The duplicate 9
    values have a rank of 2, and 10 has a rank of 4. There is a gap in the
    ranks for 3.

- Documents with a ``null`` value for a :ref:`sortBy
  <setWindowFields-sortBy>` field or documents missing the :ref:`sortBy
  <setWindowFields-sortBy>` field are assigned a rank based on the
  :ref:`BSON comparison order <bson-types-comparison-order>`.
  See the example in :ref:`rank-duplicate-null-missing-values-example`.

- .. include:: /includes/fact-8-0-rank-dense-rank-fix.rst
