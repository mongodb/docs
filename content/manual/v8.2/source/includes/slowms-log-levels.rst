Slow operations are logged based on ``workingMillis``, which is the
amount of time that MongoDB spends working on that operation. This means
that factors such as waiting for locks and flow control do not affect
whether an operation exceeds the slow operation threshold.
