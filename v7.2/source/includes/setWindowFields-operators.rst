These operators can be used with the :pipeline:`$setWindowFields` stage:

.. _setWindowFields-accumulator-operators:

- Accumulator operators: :group:`$addToSet`, :group:`$avg`, 
  :group:`$bottom`, :group:`$bottomN`, :group:`$count`, 
  :group:`$covariancePop`, :group:`$covarianceSamp`, 
  :group:`$derivative`, :group:`$expMovingAvg`, :group:`$firstN`, 
  :group:`$integral`, :group:`$lastN`, :group:`$max`, :group:`$maxN`,
  :group:`$median`, :group:`$min`, :group:`$minN`, :group:`$percentile`,
  :group:`$push`, :group:`$stdDevSamp`, :group:`$stdDevPop`,
  :group:`$sum`, :group:`$top`, :group:`$topN`.

.. _setWindowFields-gap-filling-operators:

- Gap filling operators: :group:`$linearFill` and :group:`$locf`.

.. _setWindowFields-order-operators:

- Order operators: :group:`$first`, :group:`$last`, and :group:`$shift`.

.. _setWindowFields-rank-operators:

- Rank operators: :group:`$denseRank`, :group:`$documentNumber`, and
  :group:`$rank`.
