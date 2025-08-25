.. code-block:: javascript
   
   exports = function(payload, response) {
     switch(context.request.httpMethod) {
       case "GET": { /* Handle GET requests */ }
       case "POST": { /* Handle POST requests */ }
       case "PUT": { /* Handle PUT requests */ }
       case "DELETE": { /* Handle DELETE requests */ }
       case "PATCH": { /* Handle PATCH requests */ }
       default: {}
     }
   }
