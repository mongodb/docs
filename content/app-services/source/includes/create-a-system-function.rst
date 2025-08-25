- Log in to the Realm UI, go to your Realm app, and then click :guilabel:`Functions` in the left 
  hand panel.

- Click the :guilabel:`Create New Function` button.

- Provide a descriptive :guilabel:`Name` for your function.

- :guilabel:`Authentication`: Select :guilabel:`System`. This allows your function to bypass permissions on your collections.

- :guilabel:`Log Function Arguments`: Leave it ``off``.

- :guilabel:`Authorization`:

  - :guilabel:`Can Evaluate`: Leave it blank.
  - :guilabel:`Private`: Leave it ``off``.

- Click :guilabel:`Save`. This brings you to the :guilabel:`Function Editor`, where you can now enter some to run.

.. warning::

   This configuration allows **anyone** to call this function. As a system
   function, this function bypasses access rules. Assume any client calling this
   function has malicious intent.
