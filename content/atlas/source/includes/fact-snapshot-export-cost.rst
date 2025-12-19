|service| charges ``$0.125`` per GB of data exported to the |aws| |s3|
bucket, {+az-bs+} Container, or {+gcs+} bucket in addition to the data
transfer cost incurred from the cloud service itself. |service|
compresses the data before exporting. To estimate the amount of data
being exported, add up the :manual:`dataSize
</reference/command/dbStats/#mongodb-data-dbStats.dataSize>` of each
database in your {+cluster+}. This total should correspond to the
uncompressed size of your export, which would be the maximum cost
incurred from |service| for the data export operation.
