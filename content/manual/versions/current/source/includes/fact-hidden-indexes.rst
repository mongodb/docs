MongoDB offers the ability to hide or unhide indexes from the query planner. 
By hiding an index from the planner, you can evaluate the potential impact of 
dropping an index without actually dropping the index. 

If after the evaluation, the user decides to drop the index, you
can drop the hidden index; i.e. you do not need to unhide it first to
drop it.

If, however, the impact is negative, the user can unhide the index
instead of having to recreate a dropped index. And because indexes are
fully maintained while hidden, the indexes are immediately available
for use once unhidden.

For more information on hidden indexes, see :doc:`/core/index-hidden`.