Before you start the upgrade, ensure that the amount of free space on
the filesystem for the :doc:`config database
</reference/config-database>` is 4 to 5 times the amount of space
currently used by the :doc:`config database
</reference/config-database>` data files.

Additionally, ensure that all indexes in the :doc:`config database
</reference/config-database>` are ``{v:1}`` indexes. If a critical
index is a ``{v:0}`` index, chunk splits can fail due to known issues
with the ``{v:0}`` format. ``{v:0}`` indexes are present on clusters created with
MongoDB 2.0 or earlier.
