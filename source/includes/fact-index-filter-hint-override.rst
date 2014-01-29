If the query includes a |hint-object| and an |index-filter| exists for
that query shape, MongoDB ignores the |hint-object|. As such, when an
index filter exists for the query shape, the behavior of
|explain-object| when used in conjunction with |hint-object| is
equivalent to that of just |explain-object|.
