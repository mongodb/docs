.. important::

   Atlas App Services evaluates and applies filters before it reads any
   documents, so you cannot use :ref:`MongoDB document expansions
   <mongodb-document-expansions>` in a filter's Apply When expression.
   However, you can use other expansions like :json-expansion:`%%user`,
   :json-expansion:`%%values`, and :json-operator:`%function`.
