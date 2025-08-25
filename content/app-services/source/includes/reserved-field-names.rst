App Services reserves some keywords for the Realm Query Language and other purposes.
You cannot use reserved keywords as field names.

App Services reserves the following keywords with any capitalization:

.. hlist::
   :columns: 3

   - and
   - asc
   - ascending
   - beginswith
   - between
   - contains
   - desc
   - descending
   - distinct
   - endswith
   - falsepredicate
   - inf
   - infinity
   - like
   - limit
   - nan
   - nil
   - null
   - or
   - sort
   - subquery
   - truepredicate

.. example::

   You cannot use ``descending``, ``Descending``, ``DESCENDING``, or
   ``DeScEnDiNG`` as a field name.

App Services also reserves the following keywords with the given exact capitalization:

.. hlist::
   :columns: 3

   - ALL
   - ANY
   - B64
   - FALSE
   - IN
   - NONE
   - NOT
   - SOME
   - TRUE
   - all
   - any
   - false
   - in
   - none
   - not
   - oid
   - some
   - true
   - uuid

.. example::

   You cannot use ``true`` or ``TRUE``, since both capitalizations are
   specifically reserved, but you can use ``True`` or ``tRUE`` as a field name.
