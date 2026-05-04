Starting in MongoDB 7.1, index builds are improved with faster error
reporting and increased failure resilience. You can also set the minimum
available disk space required for index builds using the new
:parameter:`indexBuildMinAvailableDiskSpaceMB` parameter, which stops
index builds if disk space is too low.
