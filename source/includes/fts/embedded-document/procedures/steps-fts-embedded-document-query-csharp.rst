.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``embedded-documents-query`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir embedded-documents-query
            cd embedded-documents-query
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`.

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic 

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/nested-array-query.cs 
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`. 

            .. literalinclude:: /includes/fts/embedded-document/nested-within-object-query.cs 
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 12

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/nested-within-array-query.cs 
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Nested Array 
            :tabid: basic 

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run embedded-documents-query.csproj

               .. output:: 
                  :language: javascript

                  { 
                    "_id" : 1, 
                    "name" : "Evergreen High", 
                    "mascot" : "Jaguars", 
                    "teachers" : [{ 
                      "first" : "Jane", 
                      "last" : "Earwhacker",
                      "classes" : [{ "
                        subject" : "art", 
                        "grade" : "9th" 
                      }, { 
                        "subject" : "science", 
                        "grade" : "12th" 
                      }] 
                    }, { 
                      "first" : "John", 
                      "last" : "Smith", 
                      "classes" : [{ 
                        "subject" : "math", 
                        "grade" : "12th" 
                      }, { 
                        "subject" : "art", 
                        "grade" : "10th" 
                      }] 
                    }], 
                    "highlights" : [{ 
                      "path" : "teachers.last", 
                      "score" : 1.4921371936798096, 
                      "texts" : [{ "type" : "Hit", "value" : "Smith" }]
                    }], 
                    "score" : 0.78307569026947021 
                  }
                  { 
                    "_id" : 2, 
                    "name" : "Lincoln High", 
                    "mascot" : "Sharks", 
                    "teachers" : [{ 
                      "first" : "Jane", 
                      "last" : "Smith", 
                      "classes" : [{ 
                        "subject" : "science", 
                        "grade" : "9th" 
                      }, { 
                        "subject" : "math", 
                        "grade" : "12th" 
                      }] 
                    }, { 
                      "first" : "John", 
                      "last" : "Redman", 
                      "classes" : [{ 
                        "subject" : "art", 
                        "grade" : "12th" 
                      }] 
                    }], 
                    "highlights" : [{ 
                      "path" : "teachers.last", 
                      "score" : 1.4702850580215454, 
                      "texts" : [{ "type" : "Hit", "value" : "Smith" }] 
                    }], 
                    "score" : 0.46800881624221802 
                  }

         .. tab:: Nested Array Within Object 
            :tabid: complex      

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run embedded-documents-query.csproj

               .. output:: 
                  :language: javascript

                  { 
                    "_id" : 2, 
                    "name" : "Lincoln High", 
                    "clubs" : { 
                      "sports" : [{ 
                        "club_name" : "dodgeball", 
                        "description" : "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves." 
                      }, { 
                        "club_name" : "martial arts", 
                        "description" : "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons." 
                      }] 
                    }, 
                    "score" : 0.63366991281509399 
                  }
                  { 
                    "_id" : 1, 
                    "name" : "Evergreen High", 
                    "clubs" : { 
                      "sports" : [{ 
                        "club_name" : "archery", 
                        "description" : "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment." 
                      }, { 
                        "club_name" : "ultimate frisbee", 
                        "description" : "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes." 
                      }] 
                    }, 
                    "score" : 0.48158913850784302 
                  }

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run embedded-documents-query.csproj

               .. output:: 
                  :language: javascript

                  { 
                    "_id" : 0, 
                    "teachers" : [{ 
                      "first" : "Jane", 
                      "last" : "Smith", 
                      "classes" : [{ 
                        "subject" : "art of science", 
                        "grade" : "12th" 
                      }, { 
                        "subject" : "applied science and practical
                        science", 
                        "grade" : "9th" 
                      }, { 
                        "subject" : "remedial math", 
                        "grade" : "12th" 
                      }, { 
                        "subject" : "science", 
                        "grade" : "10th" 
                      }] 
                    }, { 
                      "first" : "Bob", 
                      "last" : "Green", 
                      "classes" : [{ 
                        "subject" : "science of art", 
                        "grade" : "11th" 
                      }, { 
                        "subject" : "art art art", 
                        "grade" : "10th" 
                      }] 
                    }], 
                    "highlights" : [{ 
                      "path" : "teachers.classes.subject", 
                      "score" : 0.73540401458740234, 
                      "texts" : [
                        { "type" : "Text", "value" : "art of "  }, 
                        { "type" : "Hit", "value" : "science" }
                      ] 
                    }, { 
                      "path" : "teachers.classes.subject", 
                      "score" : 0.78713464736938477, 
                      "texts" : [
                        { "type" : "Text", "value" : "applied "  }, 
                        { "type" : "Hit", "value" : "science" }, 
                        { "type" : "Text", "value" : " and practical " }, 
                        { "type" : "Hit", "value" : "science" }] 
                    }, { 
                      "path" : "teachers.classes.subject", 
                      "score" : 0.7581484317779541, 
                      "texts" : [{ "type" : "Hit", "value" : "science" }] 
                    }, { 
                      "path" : "teachers.classes.subject", 
                      "score" : 0.7189631462097168, 
                      "texts" : [
                        { "type" : "Hit", "value" : "science" }, 
                        { "type" : "Text", "value" : " of art" }
                      ] 
                    }], 
                    "score" : 0.9415585994720459 
                  }
                  { 
                    "_id" : 1, 
                    "teachers" : [{ 
                      "first" : "Jane", 
                      "last" : "Earwhacker", 
                      "classes" : [{ 
                        "subject" : "art", 
                        "grade" : "9th" 
                      }, { 
                        "subject" : "science", 
                        "grade" : "12th" 
                      }] 
                    }, { 
                      "first" : "John", 
                      "last" : "Smith", 
                      "classes" : [{ 
                        "subject" : "math", 
                        "grade" : "12th" 
                      }, { 
                        "subject" : "art", 
                        "grade" : "10th" 
                      }] 
                    }], 
                    "highlights" : [{ 
                      "path" : "teachers.classes.subject", 
                      "score" : 1.502043604850769, 
                      "texts" : [{ "type" : "Hit", "value" : "science" }] 
                    }], 
                    "score" : 0.77798593044281006 
                  }
