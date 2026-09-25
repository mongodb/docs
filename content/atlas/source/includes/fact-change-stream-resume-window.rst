You can :ref:`resume a change stream <change-stream-resume>` only
while the oplog collection still holds the operation that its
:ref:`resume token <change-stream-resume-token>` identifies. To
ensure that your applications can resume their change streams,
configure a :ref:`Minimum Oplog Window <set-oplog-min-window>`
longer than the longest interruption you expect.
