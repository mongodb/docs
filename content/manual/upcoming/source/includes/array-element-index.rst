MongoDB 8.3 improves access to array element indexes in
:expression:`$map`, :expression:`$filter`, and :expression:`$reduce`
aggregation expressions. You can use the new ``arrayIndexAs`` field to
set a variable to store the index of an array element. You can also use
the new :variable:`$$IDX <IDX>` aggregation system variable to access
the index of the current array element if you omit ``arrayIndexAs``.
