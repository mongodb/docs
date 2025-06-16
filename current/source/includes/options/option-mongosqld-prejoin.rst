.. option:: --prejoin

   .. versionadded:: 2.6
   
   Schema option for combining array and non-array data into a
   single table.
   
   MongoDB documents which contain arrays are normally translated
   into tabular format with separate tables for array data and
   non-array data. Consider a MongoDB collection named ``test``
   with the following document:
   
   .. code-block:: json
      :copyable: false
   
      { "_id" : 1, "a" : 3, "b" : [ "orange", "apple", "pear" ] }
   
   The above collection translates to the following two tables in
   tabular format:
   
   .. code-block:: none
      :copyable: false
   
      mysql> select * from test;
      +------+------+
      | _id  | a    |
      +------+------+
      |    1 |    3 |
      +------+------+
   
      mysql> select * from test_b;
      +------+--------+-------+
      | _id  | b      | b_idx |
      +------+--------+-------+
      |    1 | orange |     0 |
      |    1 | apple  |     1 |
      |    1 | pear   |     2 |
      +------+--------+-------+
   
   The :option:`--prejoin <mongosqld --prejoin>` flag causes
   data from the ``a`` column to be included in the ``test_b`` table:
   
   .. code-block:: none
      :copyable: false
   
      mysql> select * from test_b;
      +------+------+--------+-------+
      | _id  | a    | b      | b_idx |
      +------+------+--------+-------+
      |    1 |    3 | orange |     0 |
      |    1 |    3 | apple  |     1 |
      |    1 |    3 | pear   |     2 |
      +------+------+--------+-------+
   

