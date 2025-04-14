|stage| is a blocking stage, which causes the pipeline to wait for all
input data to be retrieved for the blocking stage before processing the
data. A blocking stage may reduce performance because it reduces
parallel processing for a pipeline with multiple stages. A blocking
stage may also use substantial amounts of memory for large data sets.
