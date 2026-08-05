The source connector works by opening a single change stream with
MongoDB and sending data from that change stream to {+kafka-connect+}. Your source
connector maintains its change stream for the duration of its runtime, and your
connector closes its change stream when you stop it.
