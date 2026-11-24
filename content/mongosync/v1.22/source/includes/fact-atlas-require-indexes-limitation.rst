Before you attempt to run ``mongosync`` with an ``M10+`` 
Atlas cluster, disable the :guilabel:`Require Indexes for All Queries` 
option to set :parameter:`notablescan <param.notablescan>` to ``false``
on both the source and destination clusters.
