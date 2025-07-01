When you use |search-type| indexes, you might experience 
elevated resource consumption on an idle node for 
your |service| {+cluster+}. This is due to the underlying 
:ref:`mongot <about-mongot>` process, which performs various 
essential operations for |search-type|. The CPU utilization 
on an idle node can vary depending on the number, 
complexity, and size of the indexes.