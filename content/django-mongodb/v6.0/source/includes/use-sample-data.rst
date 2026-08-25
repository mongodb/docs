The |model-classes| an inner ``Meta`` class, which specifies
model metadata, and a ``__str__()`` method, which defines the 
model's string representation. To learn about these
model features, see :ref:`django-models-define` in the
Create Models guide.

Run Code Examples
`````````````````

You can use the Python interactive shell to run the code examples.
To enter the shell, run the following command from your project's 
root directory:

.. code-block:: bash

   python manage.py shell

After entering the Python shell, ensure that you import the following models and
modules:

|model-imports|

To learn how to create a {+framework+} application that uses the ``Movie``
model and the Python interactive shell to interact with MongoDB documents,
visit the :ref:`django-get-started` tutorial.