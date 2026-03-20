Don't define a new client object each time that you invoke your
function. Doing so causes the driver to create a new database
connection with each function call. This can be expensive and
can result in your application exceeding database connection limits.
For best performance, follow these guidelines:

1. Create the client object once.
2. Store the object so your function can reuse the client 
   across function invocations.