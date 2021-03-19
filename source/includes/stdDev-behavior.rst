Behavior with values in a :pipeline:`$setWindowFields` stage
:ref:`window <setWindowFields-window>`:

- Ignores non-numeric values, ``null`` values, and missing fields in a
  window.

- If the window is empty, returns ``null``.

- If the window contains a ``NaN`` value, returns ``null``.

- If the window contains ``Infinity`` values, returns ``null``.

- If none of the previous points apply, returns a ``double`` value.