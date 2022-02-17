Learn about the following TypeScript specific limitations of
version {+version+} of the {+driver-short+}:

- :ref:`No type safety for dot notation references to nested instances of recursive types <node-driver-recursive-types-dot-notation>`
- :ref:`No mutually recursive types <node-driver-limitations-mutual-recursion>`

.. _node-driver-recursive-types-dot-notation:

Recursive Types and Dot Notation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+driver-short+} cannot provide type safety within nested instances of
**recursive types** referenced through dot notation.

A recursive type is a type that references itself. You can update
the :ref:`Pet <mongodb-node-typescript-pet-interface>` interface
to be recursive by allowing a pet to have its own pet. The following is the
recursive ``Pet`` interface:

.. _node-driver-limitations-recursive-pet:

.. code-block:: typescript
   :emphasize-lines: 2

   interface RecursivePet {
      pet?: RecursivePet;
      name: string;
      age: number;
   }

.. note:: Depth Limit

   The {+driver-short+} does not traverse nested recursive types when
   type checking dot notation keys to avoid hitting
   TypeScript's recursive depth limit.

The following code snippet references a nested instance of the
:ref:`RecursivePet <node-driver-limitations-recursive-pet>` interface
with an incorrect type using dot notation, but the TypeScript compiler
does not raise a type error:

.. code-block:: typescript
   :emphasize-lines: 3

   database
      .collection<RecursivePet>("<your collection>")
      .findOne({ "pet.age": "Spot" });

The following code snippet references a top-level instance of the
``RecursivePet`` interface with an incorrect type and raises a type error:

.. code-block:: typescript
   :emphasize-lines: 3

   database
      .collection<RecursivePet>("<your collection>")
      .findOne({ pet: "Spot" });

The error raised by the preceding code snippet is as follows:

.. code-block:: none

   index.ts(19,59): error TS2769: No overload matches this call.
   The last overload gave the following error.
   Type 'string' is not assignable to type 'Condition<Pet>'.

If you must have type safety within nested instances of recursive types,
you must write your query or update without dot notation.

To learn more about dot notation, see
:manual:`Dot Notation </core/document/#dot-notation>`
in the MongoDB manual.

.. _node-driver-limitations-mutual-recursion:

Mutual Recursion
~~~~~~~~~~~~~~~~

You cannot specify a **mutually recursive** type as a type parameter in version
4.3 of the driver.

A mutually recursive type exists when two types contain a property that is of
the other's type. You can update the
:ref:`Pet <mongodb-node-typescript-pet-interface>` interface
to be mutually recursive by allowing a pet to have a handler, and defining a
handler to have a pet. The following are the mutually
recursive ``Pet`` and ``Handler`` interfaces:

.. code-block:: typescript
   :emphasize-lines: 2, 8

   interface MutuallyRecursivePet {
      handler?: Handler;
      name: string;
      age: number;
   }

   interface Handler {
      pet: MutuallyRecursivePet;
      name: string;
   }

If you specify a mutually recursive type, the TypeScript compiler raises the
following error:

.. code-block:: none

   error TS2615: Type of property 'r' circularly references itself in mapped type '{ [Key in keyof MutuallyRecursive]...

If you must apply a mutually recursive type to your classes, use version 4.2 of
the {+driver-short+}.
