- Ignores non-numeric values, ``null`` values, and missing fields in a
  window.

- If the window contains one document, returns ``null``.
  (Compare to |covariance-method|, which returns |covariance-value| if
  the window contains one document.)

- If the window is empty, returns ``null``.

- If the window contains a ``NaN`` value, returns ``NaN``.

- If the window contains one or more ``Infinity`` value(s) that are
  all positive or all negative, returns ``Infinity``. The returned
  ``Infinity`` value has the same sign as the ``Infinity`` values in the
  window.

- If the window contains ``Infinity`` values with different signs,
  returns ``NaN``.

- If the window contains a ``decimal`` value, returns a ``decimal``
  value.

- If none of the previous points apply, returns a ``double`` value.

The returned values in order of precedence are as follows:

- ``NaN``

- ``Infinity``

- ``decimal``

- ``double``