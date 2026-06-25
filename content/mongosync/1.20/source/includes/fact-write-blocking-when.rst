You can safely write to the source cluster while ``mongosync`` is
syncing. Do not write to the destination cluster unless ``canWrite`` is
``true``.