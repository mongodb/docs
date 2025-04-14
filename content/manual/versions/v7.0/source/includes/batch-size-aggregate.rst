The ``{ cursor: { batchSize: 0 } }`` document, which specifies the size of the 
*initial* batch size, indicates an empty first batch. This batch size is useful 
for quickly returning a cursor or failure message without doing significant 
server-side work. 

To specify batch size for subsequent :dbcommand:`getMore` operations 
(after the initial batch), use the ``batchSize`` field when running the 
:dbcommand:`getMore` command. 

