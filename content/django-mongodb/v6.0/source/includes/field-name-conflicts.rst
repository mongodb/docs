.. important:: Avoid Conflicting Field Names

   If you query a field that is shared among multiple embedded models
   but has different data types, you might see inaccurate results.
   {+framework+} cannot correctly determine which data type to assign
   to the lookup value. In this case, {+django-odm+} iterates through
   the embedded models and uses the first field and corresponding data
   type that it finds. 

   Similarly, if you query a nested embedded model field that has the same
   name and data type in multiple models, {+django-odm+} queries
   only the first model listed in your |field| definition.