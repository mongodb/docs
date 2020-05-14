.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         By default, the shell will only show the first 20 documents
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
         
         .. code-block:: python
          
            from pprint import pprint
                
            for inventory in cursor:
                 pprint(inventory)   

     - id: motor
       content: |

         In the code snippet above you may have noticed the code that
         iterates the results and prints them to the command line:
         
         .. code-block:: python

            async for doc in cursor:
                print(doc)

     - id: go
       content: |

         Iterate the results and print them to the command line:
         
         .. code-block:: go
          
            for cursor.Next(context.TODO()) {
                elem := &bson.D{}
                if err := cursor.Decode(elem); err != nil {
                        log.Fatal(err)
                }
                // ideally, you would do something with elem....
                // but for now just print it to the console
                fmt.Println(elem)
            }
            
     - id: java-sync
       content: |

         You can implement a ``java.util.function.Consumer`` to print the
         results of the iteration
         
         .. code-block:: java
         
            Consumer<Document> printConsumer = new Consumer<>() {
                public void accept(final Document doc) {
                    System.out.println(doc.toJson());
                }
            };
         
         Then iterate the cursor for documents, passing the
         ``printConsumer`` as a parameter.
         
         .. code-block:: java
       
            findIterable.forEach(printConsumer);

     - id: nodejs
       content: |
         .. code-block:: javascript

            function iterateFunc(doc) {
               console.log(JSON.stringify(doc, null, 4));
            }

            function errorFunc(error) {
               console.log(error);
            }
            
            cursor.forEach(iterateFunc, errorFunc);

     - id: csharp
       content: |
         .. code-block:: c#
           
            foreach (var doc in result) {
               Console.WriteLine(doc.ToJson());
            }

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
           
