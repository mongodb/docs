.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
   
   .. step:: Go to the :guilabel:`Search Tester` page.

      Click the :guilabel:`Query` button to the right of the index to
      query. 

   .. step:: View and edit the query syntax.

      Click :guilabel:`Edit Query` to view a default query
      syntax sample in |json| format.
      
   .. step:: Run an |fts| query with the ``embeddedDocument`` operator on the ``schools`` collection.

      Copy and paste the following query into the :guilabel:`Query
      Editor`, and then click the :guilabel:`Search` button in the
      :guilabel:`Query Editor`.

      .. note:: 

        The :guilabel:`Search Tester` doesn't support :ref:`highlighting
        <highlight-ref>`. So, use {+mongosh+} or a MongoDB driver to see
        :ref:`highlighting <highlight-ref>` information in the results.

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.
      
            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: json
                  :linenos: 

                  [
                    {
                      "$search": {
                        "index": "embedded-documents-tutorial",
                        "embeddedDocument": {
                          "path": "teachers",
                          "operator": {
                            "compound": {
                              "must": [{
                                "text": {
                                  "path": "teachers.first",
                                  "query": "John"
                                }
                              }],
                              "should":[{
                                "text": {
                                  "path": "teachers.last",
                                  "query": "Smith"
                                }
                              }]
                            }
                          }
                        }
                      }
                    }
                  ]
      
               .. output:: 
                  :visible: true 

                  SCORE: 0.7830756902694702  _id:  "1"
                    name: "Evergreen High"
                    mascot: "Jaguars"
                    teachers: Array 
                      0: Object
                        first: "Jane"
                        last: "Earwhacker"
                        classes: Array
                          ...
                      1: Object
                        first: "John"
                        last: "Smith"
                        classes: Array
                          ...
                    clubs: Object
                      ...

                  SCORE: 0.468008816242218  _id:  "2"
                    name: "Lincoln High"
                    mascot: "Sharks"
                    teachers: Array
                      0: Object
                        first: "Jane"
                        last: "Smith"
                        classes: Array
                          ...
                      1: Object
                        first: "John"
                        last: "Redman"
                        classes: Array
                          ...
                    clubs: Object
                      ...

         .. tab:: Nested Array Within Object
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.
      
            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: json
                  :linenos: 

                  [
                    {
                      "$search": {
                        "index": "embedded-documents-tutorial",
                        "embeddedDocument": {
                          "path": "clubs.sports",
                          "operator": {
                            "queryString": {
                              "defaultPath": "clubs.sports.club_name",
                              "query": "dodgeball OR frisbee"
                            }
                          }
                        }
                      }
                    }
                  ]
      
               .. output:: 
                  :visible: true 

                  score: 0.633669912815094  _id: 2
                    name: "Lincoln High"
                    mascot: "Sharks"
                    teachers: Array
                      ...
                    clubs: Object
                      sports: Array (2)
                        0: Object
                          club_name: "dodgeball"
                          description: "provides students an opportunity
                          to play dodgeball by throwing   balls t…"
                        1: Object
                          club_name: "martial arts"
                          description: "provides students an opportunity to learn self-defense or combat that …"
                      stem: Array (2) 
                        ...                 

                  score: 0.481589138507843  _id: 1
                    name: "Evergreen High"
                    mascot: "Jaguars"
                    teachers: Array
                      ...
                    clubs: Object
                      sports: Array (2)
                        0: Object
                          club_name: "archery"
                          description: "provides students an opportunity to practice and hone the skill of usi…"
                        1: Object
                          club_name: "ultimate frisbee"
                          description: "provides students an opportunity to play frisbee and learn the basics …"
                      stem: Array (2) 
                        ...

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.  

            .. io-code-block::
               :copyable: true
            
               .. input:: 
                  :language: json

                  [
                    {
                      $search: {
                        index: "embedded-documents-tutorial",
                        "embeddedDocument": {
                          "path": "teachers",
                          "operator": {
                            "compound": {
                              "must": [{
                                "embeddedDocument": {
                                  "path": "teachers.classes",
                                  "operator": {
                                    "compound": {
                                      "must": [{
                                        "text": {
                                          "path": "teachers.classes.grade",
                                          "query": "12th"
                                        }
                                      },
                                      {
                                        "text": {
                                          "path": "teachers.classes.subject",
                                          "query": "science"
                                        }
                                      }]
                                    }
                                  }
                                }
                              }],
                              "should": [{
                                "text": {
                                  "path": "teachers.last",
                                  "query": "smith"
                                }
                              }]
                            }
                          }
                        }
                      }
                    }
                  ]
            
               .. output:: 
                  :visible: true

                  SCORE: 0.9415585994720459
                    name: "Springfield High"
                    mascot: "Pumas"
                    teachers: Array
                      0: Object
                        first: "Jane"
                        last: "Smith"
                        classes: Array
                          0: Object
                            subject: "art of science"
                            grade: "12th"
                          1: Object
                            subject: "applied science and practical science"
                            grade: "9th"
                          2: Object
                            subject: "remedial math"
                            grade: "12th"
                          3: Object
                            subject: "science"
                            grade: "10th"
                      1: Object
                        first: "Bob"
                        last: "Green"
                        classes: Array
                          0: Object
                            subject: "science of art"
                            grade: "11th"
                          1: Object
                            subject: "art art art"
                            grade: "10th"
                    clubs: Object
                      ...

                  SCORE: 0.7779859304428101  _id:  "1"
                    name: "Evergreen High"
                    mascot: "Jaguars"
                    teachers: Array
                      0: Object
                        first: "Jane"
                        last: "Earwhacker"
                        classes: Array
                          0: Object
                            subject: "art"
                            grade: "9th"
                          1: Object
                            subject: "science"
                            grade: "12th"
                      1: Object
                        first: "John"
                        last: "Smith"
                        classes: Array
                          0: Object
                            subject: "math"
                            grade: "12th"
                          1: Object
                            subject: "art"
                            grade: "10th"
                    clubs: Object 
                      ...
