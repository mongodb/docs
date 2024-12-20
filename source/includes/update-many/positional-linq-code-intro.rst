The following example uses the ``Set()`` and ``FirstMatchingElement()`` methods to
update the ``Grades`` array in all matching documents. First,
it finds *only the first* ``GradeEntry`` object in the ``Grades`` array where the
``Grade`` property has the value ``"A"``. Then, it updates the ``Score`` property of
the first matching ``GradeEntry`` object to 100.