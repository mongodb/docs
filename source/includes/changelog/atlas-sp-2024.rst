.. _atlas-sp-20240828:

28 August 2024 Release
----------------------

- Supports converting from :bsontype:`Binary` data to various data types using :manual:`$convert </reference/operator/aggregation/convert>`. This allows you to transform Kafka headers into specific data types as needed.
- Stream processors that use {+kafka+} as a source expose per-partition watermarks in :method:`sp.processor.stats()`.
- Fixes a bug where users were unable to create {+spi+}s in certain regions through the :oas-atlas-op:`API </createStreamInstance>`.
