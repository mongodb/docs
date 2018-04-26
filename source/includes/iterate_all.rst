.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         By default, the shell will only show the first set of documents
         and return a cursor. This is adequate when the result set only
         contains a few documents.

         If your result set is larger, to see *all* of the results of
         your query, iterate the cursor.
         
         .. code-block:: sh

            while (myCursor.hasNext()) {
                print(tojson(myCursor.next()));
            }

         .. note:: You can also manually iterate through the results by
            typing ``it`` when prompted by the shell.

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
         Create a method to print the results of the iteration 
         
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

            
     #- id: php
     #  content: |
     #    .. code-block:: sh
     #       
     #       foreach ( $cursor as $id => $value )
     #       {
     #           var_dump( $value );
     #       }

     #- id: perl
     #  content: |
     #    
     #    perl doesn't have native support for JSON, for this example,
     #    you can download the ``JSON`` module from cpan by running

     #    .. code-block:: sh

     #       cpan install JSON

     #    .. code-block:: sh
     #    
     #       use JSON;

     #       my $JSON = JSON->new->utf8;
     #       $JSON->convert_blessed(1);
     #       
     #       while (my $doc = $cursor->next) {
     #          my $object = $JSON->encode($doc);
     #          print "$object\n";
     #       }

     #- id: ruby
     #  content: |
     #    .. code-block:: sh
     #       
     #       cursor.each do |doc|
     #          puts doc
     #       end

     #- id: scala
     #  content: |
     #    .. code-block:: sh
     #       
     #       collection.find().subscribe((doc: Document) => println(doc.toJson()))
           

     - id: csharp
       content: |
         .. code-block:: sh
           
            foreach (var doc in result) {
               Console.WriteLine(doc.ToJson());
            }