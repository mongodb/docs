Use :ref:`analytics nodes <analytics-nodes-overview>` to isolate
queries which you do not wish to contend with your operational
workload. Analytics nodes are useful
for handling data analysis operations, such as reporting queries from
|bic|. Analytics nodes have distinct
:manual:`read preference </core/read-preference>` tags which allow you
to direct queries to desired regions.
 
Click :guilabel:`Add a region` to select a region in which to
deploy analytics nodes. Specify the desired number of
:guilabel:`Nodes` for the region.
