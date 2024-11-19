If the source cluster shuts down before ``mongosync`` can commit, such as in 
a disaster scenario, the destination cluster might not have a consistent 
snapshot of the source data. To learn more, see :ref:`c2c-behavior-consistency`.