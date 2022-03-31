.. tabs-drivers::

   tabs:

     - id: python
       content: |

         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: crud_read.py
            :copyable: true

            .. input:: /includes/code/python/crud_read_final_query.py
               :language: python
               :linenos:

            .. output::
               :language: json

               {... 'name': 'Uranus', 'hasRings': True, ...}
               {... 'name': 'Neptune', 'hasRings': True, ... }
               {... 'name': 'Jupiter', 'hasRings': True, ... }
               {... 'name': 'Saturn', 'hasRings': True, ... }

     - id: go
       content: |

         Here is the complete code followed by sample output. The output
         documents have been truncated here for display purposes.

         .. io-code-block::
            :caption: crudRead.go
            :copyable: true

            .. input:: /includes/code/go/crud-read-final-query.go
               :language: go
               :linenos:

            .. output::
               :language: json

                map[... hasRings:true name:Uranus ... ]]
                map[... hasRings:true name:Neptune ... ]]
                map[... hasRings:true name:Jupiter ... ]]
                map[... hasRings:true name:Saturn ... ]]

     - id: java-sync
       content: |
         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: CrudRead.java
            :copyable: true

            .. input:: /includes/code/java/CrudReadFinalQuery.java
               :language: java
               :linenos:

            .. output::
               :language: json

               {... 'name': 'Uranus', 'hasRings': True, ...}
               {... 'name': 'Neptune', 'hasRings': True, ... }
               {... 'name': 'Jupiter', 'hasRings': True, ... }
               {... 'name': 'Saturn', 'hasRings': True, ... }




     - id: nodejs
       content: |

         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: crud-read.js
            :copyable: true

            .. input:: /includes/code/node/crud-read-final-query.js
               :language: javascript
               :linenos:

            .. output::
               :language: json

               {... 'name': 'Uranus', 'hasRings': True, ...}
               {... 'name': 'Neptune', 'hasRings': True, ... }
               {... 'name': 'Jupiter', 'hasRings': True, ... }
               {... 'name': 'Saturn', 'hasRings': True, ... }


     - id: csharp
       content: |
         Here is the complete code followed by sample output.

         .. io-code-block::
            :caption: CrudRead.cs
            :copyable: true

            .. input:: /includes/code/dotnet/CrudReadFinalQuery.cs
               :language: csharp
               :linenos:

            .. output::
               :language: json

               {... 'name': 'Uranus', 'hasRings': True, ...}
               {... 'name': 'Neptune', 'hasRings': True, ... }
               {... 'name': 'Jupiter', 'hasRings': True, ... }
               {... 'name': 'Saturn', 'hasRings': True, ... }
