.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         To modify an existing index in the MongoDB Shell, you need to
         drop and recreate the index. The exception to this rule is
         :ref:`TTL indexes <index-feature-ttl>`, which can be modified
         via the :dbcommand:`collMod` command in conjunction with the
         :collflag:`index` collection flag.

     - id: compass
       content: |
         To modify an existing index in |compass|, you need to drop and
         recreate the index.
