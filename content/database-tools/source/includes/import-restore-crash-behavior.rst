If |tool-binary| crashes, it can leave the system in an 
inconsistent state where only *some* of the data was |data-action|, 
but not all of it. After a crash, delete any |data-action| data and 
rerun the process from the beginning.