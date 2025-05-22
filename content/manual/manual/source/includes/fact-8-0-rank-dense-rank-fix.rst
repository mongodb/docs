Starting in MongoDB 8.0, ``null`` and missing field values in 
:group:`$denseRank` and :group:`$rank`
:ref:`sortBy <setWindowFields-sortBy>` operations 
are treated the same when calculating rankings. This change makes 
the behavior of ``denseRank`` and ``rank`` consistent with 
:pipeline:`$sort`.