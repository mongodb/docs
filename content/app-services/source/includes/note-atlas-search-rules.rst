.. important::
          
   App Services performs ``$search`` operations as a system user and
   enforces field-level rules on the returned search results. This means that a
   user may search on a field for which they do not have read access. In this
   case, the search is based on the specified field but no returned documents
   include the field.
