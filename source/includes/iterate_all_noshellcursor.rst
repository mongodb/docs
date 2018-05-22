.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         This query does not require cursor iteration in ``mongo`` shell.

     - id: compass
       content: |

         You will see a list of all of the documents that match your
         criteria in the query window.

     - id: python
       content: |
         
         .. code-block:: python
          
            from pprint import pprint
                
            for inventory in cursor:
                 pprint(inventory)   

     - id: motor
       content: |
         
         .. code-block:: python

            async for doc in cursor:
                print(doc)
         
         Run the loop:
         
         .. code-block:: python
         
            loop = asyncio.get_event_loop()
            loop.run_until_complete(do_update_one())

     - id: java-sync
       content: |
         
         You can implement a ``com.mongodb.Block`` to print the results
         of the iteration
         
         .. code-block:: java
         
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                    System.out.println(document.toJson());
                }
            };
         
         Then iterate the cursor for documents, passing the
         ``printBlock`` as a parameter.
         
         .. code-block:: java
       
            findIterable.forEach(printBlock);

     - id: nodejs
       content: |
         .. code-block:: javascript
            
            cursor.each(function(err, doc) {
                console.log(doc);
            });


     - id: csharp
       content: |
         .. code-block:: csharp
           
            foreach (var doc in result) {
               Console.WriteLine(doc.ToJson());
            }

