If enabled, when this Trigger's resume token
cannot be found in the cluster's oplog, the Trigger automatically resumes
processing events at the next relevant change stream event.
All change stream events from when the Trigger was suspended until the Trigger
resumes execution do not have the Trigger fire for them.
