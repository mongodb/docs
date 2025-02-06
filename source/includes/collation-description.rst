A collation is a set of language-specific rules for string comparison, such as
for letter case and accent marks.

To specify a collation, create an instance of the ``Collation`` class or a Python dictionary.
For a list of options to pass to the ``Collation`` constructor or include as keys in the
dictionary, see :manual:`Collation </reference/collation/>` in the {+mdb-server+} manual.

.. tip:: Import Collation

   To create an instance of the ``Collation`` class, you must import it from
   ``pymongo.collation``. 