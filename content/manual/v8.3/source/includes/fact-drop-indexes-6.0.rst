Starting in MongoDB 6.0, |drop-index| raises an error if you attempt
to use it to remove the last remaining shard key compatible index. 
Passing ``"*"`` to |drop-index| drops all indexes except 
the ``_id`` index and the last remaining shard key compatible index, 
if one exists.
