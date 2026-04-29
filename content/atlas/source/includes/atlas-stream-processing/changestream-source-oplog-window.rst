When using a change stream ``$source``, configure the source cluster
with an :ref:`oplog window <set-oplog-min-window>` of at least 24
hours.

To read the change stream, {+atlas-sp+} scans the oplog collection.
You may see ``COLLSCAN`` warnings in your logs as a result. These
warnings indicate normal behavior and do not signal an error.

If you configure ``config.fullDocument`` or
``config.fullDocumentBeforeChange`` to ``required``, enable
``changeStreamPreAndPostImages`` on each collection before any write
operations that you want to capture. If a post-image is unavailable
for an event because you had not enabled the feature when the write
occurred, or because the post-image expired, the stream processor
fails. To learn how to enable pre- and post-images, see
:ref:`collMod-change-stream-pre-and-post-images`.