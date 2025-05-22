.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         To modify an existing index, you need to drop and recreate the
         index. The exception to this rule is
         :doc:`TTL indexes </core/index-ttl/>`, which can be modified
         via the :dbcommand:`collMod` command in conjunction with the
         :collflag:`index` collection flag.

     - id: compass
       content: |
         To modify an existing index in |compass|, you need to drop and
         recreate the index.