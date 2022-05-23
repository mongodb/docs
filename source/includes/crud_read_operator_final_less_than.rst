
.. tabs-drivers::

   tabs:

     - id: python
       content: |

         .. io-code-block::
            :caption: crud_read.py
            :copyable: true

            .. input:: /includes/code/python/crud_read_final_less_than.py
               :language: python
               :linenos:

            .. output:: /includes/crud/less-than-query-out.txt
               :language: json
     - id: go
       content: |

         .. io-code-block::
            :caption: crudRead.go
            :copyable: true

            .. input:: /includes/code/go/crud-read-final-less-than.go
               :language: go
               :linenos:

            .. output::
               :language: json

                map[ name:Uranus surfaceTemperatureC:map[max:<nil> mean:-197.2 min:<nil>] ...]
                map[ name:Mars surfaceTemperatureC:map[max:35 mean:-63 min:-143] ... ]
                map[ name:Neptune surfaceTemperatureC:map[max:<nil> mean:-201 min:<nil>] ... ]
                map[ name:Jupiter surfaceTemperatureC:map[max:<nil> mean:-145.15 min:<nil>] ... ]
                map[ name:Earth surfaceTemperatureC:map[max:56.7 mean:14 min:-89.2]]
                map[ name:Saturn surfaceTemperatureC:map[max:<nil> mean:-139.15 min:<nil>] ... ]

     - id: java-sync
       content: |

         .. io-code-block::
            :caption: CrudRead.java
            :copyable: true

            .. input:: /includes/code/java/CrudReadFinalLessThan.java
               :language: java
               :linenos:

            .. output:: /includes/crud/less-than-query-out.txt
               :language: json

     - id: nodejs
       content: |

         .. io-code-block::
            :caption: crud-read.js
            :copyable: true

            .. input:: /includes/code/node/crud-read-final-less-than.js
               :language: javascript
               :linenos:

            .. output:: /includes/crud/less-than-query-out.txt
               :language: json

     - id: csharp
       content: |

         .. io-code-block::
            :caption: CrudRead.cs
            :copyable: true

            .. input:: /includes/code/dotnet/CrudReadFinalLessThan.cs
               :language: csharp
               :linenos:

            .. output:: /includes/crud/less-than-query-out.txt
               :language: json
