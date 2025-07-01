- Uses a compound :pipeline:`$search` stage to:

  - Specify that results ``must`` be within a ``Polygon`` defined by a
    set of ``coordinates``. 

  - Give preference to results for properties of type ``condominium``.

- Uses a :pipeline:`$project` stage to:

  - Exclude all fields except ``name``, ``address`` and ``property_type``.

  - Add a relevance ``score`` to each returned document.
