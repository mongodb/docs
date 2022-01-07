These operators can be used with the :pipeline:`$setWindowFields` stage:

.. _setWindowFields-accumulator-operators:

- Accumulator operators: :group:`$addToSet`, :group:`$avg`, 
  :group:`$bottomN`, :group:`$count`, :group:`$covariancePop`, 
  :group:`$covarianceSamp`, :group:`$derivative`, 
  :group:`$expMovingAvg`, :group:`$integral`, :group:`$max`, :group:`$maxN`, 
  :group:`$min`, :group:`$minN`, :group:`$push`, :group:`$stdDevSamp`,
  :group:`$stdDevPop`, :group:`$sum` and :group:`$topN`.

.. _setWindowFields-gap-filling-operators:

- Gap filling operators: :group:`$locf`.

.. _setWindowFields-order-operators:

- Order operators: :group:`$first`, :group:`$last`, and :group:`$shift`.

.. _setWindowFields-rank-operators:

- Rank operators: :group:`$denseRank`, :group:`$documentNumber`, and
  :group:`$rank`.
