Document that enables preferential routing for this query. If you set
a value for this field, {+service+} executes this query against the
same search node each time as long as that value remains the same,
overriding the :ref:`default query routing <about-mongot>` behavior.

This document contains a key-value pair where the value of
``key`` is an arbitrary string. 

:gold:`IMPORTANT:` Enabling this setting can improve the consistency
of your search results, but doesn't guarantee perpetual
consistency. Changes to your data set, index structure, cluster
topology, or preferred node availability might still cause
inconsistencies.
