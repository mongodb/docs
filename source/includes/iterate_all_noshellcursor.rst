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
         
         .. code-block:: sh
          
            from pprint import pprint
                
            for inventory in cursor:
                 pprint(inventory)   

     - id: motor
       content: |
         
         .. code-block:: sh

            async for doc in cursor:
                print(doc)

     - id: java-sync
       content: |
         
         You can implement a ``com.mongodb.Block`` to print the results
         of the iteration
         
         .. class: copyable-code
         .. code-block:: sh
         
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                    System.out.println(document.toJson());
                }
            };
         
         Then iterate the cursor for documents, passing the
         ``printBlock`` as a parameter.
         
         .. class: copyable-code
         .. code-block:: sh
       
            findIterable.forEach(printBlock);

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. code-block:: sh
            
            cursor.each(function(err, doc) {
                console.log(doc);
            });


     - id: csharp
       content: |
         .. code-block:: sh
           
            foreach (var doc in result) {
               Console.WriteLine(doc.ToJson());
            }

