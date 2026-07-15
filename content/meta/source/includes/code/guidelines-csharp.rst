Code Style Guidelines
---------------------

This section describes conventions for writing C# code examples in
documentation. The goal is to keep examples readable, idiomatic, and easy
for readers to adapt while avoiding unnecessary complexity.

See Microsoft's
`Common C# code conventions <https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions>`__
and `C# identifier naming rules and conventions <https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names>`__
for additional guidance.

Keep the following in mind as you write C# code examples:

Assumptions and Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Target the latest C# and .NET Framework versions. This is already
  set in the Grove project configuration and is maintained regularly.
- Target the latest .NET/C# driver version. This is also already set in 
  the Grove project configuration and is maintained regularly.
- Avoid third-party libraries unless the page is explicitly about
  that library (for example, a web framework tutorial).
- Avoid preview or incubation features in code examples.
- Avoid deprecated patterns.  
- Avoid preview features in code examples.
- Avoid deprecated patterns.

Builder Pattern
~~~~~~~~~~~~~~~

Several MongoDB APIs use builder patterns, which can lead to long chains of method calls. 
When using builders in code examples, follow these guidelines to maintain readability:

- Place a builder on the same line as the method. Here's an 
  example of a aggregation pipleline using the builder pattern:

  .. code-block:: csharp
     :emphasize-lines: 3, 6

     var results = _persons.Aggregate()
         .Match(p => p.Vocation == "ENGINEER")
         .Sort(Builders<Person>.Sort.Descending(p => p.DateOfBirth)
         .Limit(3)
  
         .Project(Builders<Person>.Projection
             .Exclude(p => p.Address)
             .Exclude(p => p.Id)

Conditional Logic
~~~~~~~~~~~~~~~~~

- Keep conditional logic (or "control flow") shallow and easy to follow:

  .. code-block:: csharp

    if (documents.Count() > 0) 
    {
        collection.insertMany(documents);
    }

- Avoid deeply nested ``if``/``else`` blocks or multi-level loops in short
  examples.
- Use early returns when they simplify the example logic.

Code Block Height
~~~~~~~~~~~~~~~~~

- Ideally, most code examples should be short, around 15-25 lines. However, they
  can exceed this height if needed to accomplish the intended purpose.
- If a code block is too long to comfortably display on a single screen, consider:

  - Breaking it into multiple blocks.
  - Hiding non-essential parts of the code. See :ref:`truncations-and-omissions-csharp`.
  - Using emphasis to draw attention to the most important parts of the code.
    See :ref:`code-example-formatting-emphasis`.

- Avoid trailing whitespace.

Code Comments
~~~~~~~~~~~~~

Comments help clarify the intent of the code and help readers better understand it. 
Use them carefully, though: avoid over-commenting or stating the obvious, 
and instead focus on providing value to the reader. Remember that code comments 
are especially useful when code is just copy-pasted by the reader and no longer 
have the context of the surrounding text.

.. tip::

   Our platform supports line highlighting to draw attention to specific lines 
   in a code block. Consider using these with a text description outside of 
   the code block or in conjunction with a short comment to provide additional 
   context. 

- Use code comments to explain or call out important details, including:

  - Non-obvious logic or intent. *Don't* restate the code.

    .. tip::

       Rewrite your code to avoid trivial comments. For example,
       meaningful and self-explanatory naming is better than a comment.

  - Omitted or truncated code sections. If you need to omit code, use a
    comment to indicate what is missing and why. See :ref:`truncations-and-omissions-csharp`.

- Use short, inline comments within one line of 60-80 characters when possible.
- Put comments on separate lines *above* the code they're commenting on.

Inline
######

In general, use single-line inline comments to comment your code when possible.

- Place the comment on the line above the code it's commenting on; avoid inline 
  comments on the same line as the code they're commenting on.

.. code-block:: csharp

   // PREFERRED: Put your inline comment on the line above the code it's commenting on.
   var age = 5;

   var score = 10; // AVOID: Don't put your inline comment on the same line as the code.


Multi-line
##########
Use consecutive single-line comments when an explanation or description
exceeds one line. For example, you might need to describe the overall
purpose of a long code section or some especially complex logic.

.. code-block:: csharp

   // This is a longer comment that spans multiple lines.
   // Each line starts with the comment prefix.
   // Use consecutive single-line comments rather than block comments.
   var y = 10;  

   /* 
     Avoid using block comments like this for longer explanations.
     Modern C# style favors single-line comments, even for multi-line explanations.
 As this sentence shows, a block comment might not have even margins on 
  the left side, which can make it harder to read.
   */

XML Comments
############

Do not include `XML comments <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/>`__
unless the method is being called by other code, like in a complete sample application.
These descriptive comments are typically used for generating API documentation. 
However, XML comments are unnecessary in code snippets, and they can be avoided
by writing
clear and descriptive code.

Configurable Fields
~~~~~~~~~~~~~~~~~~~

- Define variables for fields that are configurable by the user, such as connection
  strings, database names, and collection names.
- For procedures, introduce variables in either a setup section or as an explicit step
  when the variable is first used.
- Ensure that the variable placeholders are obvious (for example, use
  ``emphasize-lines`` to highlight the line), and readers can
  easily understand how to configure them (for example, use comments to
  explain what the variable represents).
  See also :ref:`placeholders-csharp`.

Error Handling
~~~~~~~~~~~~~~
Use try-catch blocks to handle exceptions only when they are relevant in the context of 
the example and add value to the reader's understanding
the concept the reader is learning. For example, the following snippet shows an 
acceptible use of try-catch:

.. code-block:: csharp

  try
  {
      using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));

      await SearchIndexChecker.WaitForIndexAsync(
          _collection,
          "nonexistent_index",
          timeout: TimeSpan.FromSeconds(60),
          pollInterval: TimeSpan.FromSeconds(1),
          cancellationToken: cts.Token));
  }
  // This catch block demonstrates how to handle an index creation error.
  catch (MongoCommandException mce) 
  {
      Console.WriteLine("Environment does not support Atlas Search indexes: " + mce.Message);
  }
  // This catch block demonstrates how to handle a timeout error.
  catch (TimeoutException te)
  {
      Console.WriteLine("A MongoDB Timeout exception has occurred: " + te.Message);
  }

While using try-catch blocks is a best practice, they often make code snippets longer 
than they need to be for explaining the core concept. If you do use try-catch blocks, 
make sure to include a comment in the catch block to explain what kind of error is 
being handled and why it's relevant to the example.

File, Class, and Method Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
While the C# convention is to place each class in its own file, 
you can include MongoDB data model classes in the same file as the code snippet 
if they are only used within that snippet.

Otherwise, follow the standard C# conventions for classes and methods.

Formatting
~~~~~~~~~~
Even if your IDE formats your code automatically, make sure to run 
``dotnet format`` on your code examples before creating the snippet files.
When GitHub runs its tools on your PR, it runs ``dotnet format`` to check for 
formatting issues and will fail if your code is not formatted correctly. By 
running it locally before creating your snippet files, you can ensure that your 
code is properly formatted and avoid build errors in your PR.

Line Length and Breaks
~~~~~~~~~~~~~~~~~~~~~~
Keep lines of code to a maximum of 80 characters when possible. If a line exceeds 
this length, break it up into multiple lines in a way that maintains readability 
and follows C# conventions.

While multi-line method class can be difficult to read, it is often a 
reasonable tradeoff for limiting the need to horizontally scroll to see the code.
Use your judgement to determine whether breaking up a line of code makes it more 
or less readable on the page.

Logging and Output
~~~~~~~~~~~~~~~~~~

Use ``Console.WriteLine`` when you are also showing the output from the code example 
on the page (using the ``..io-codeblock::`` output directive). Otherwise, consider 
using a comment to indicate what the expected output of the code is.

When demonstrating realistic application patterns, use a logger appropriate 
to the application type.

Naming Conventions
~~~~~~~~~~~~~~~~~~
Always name your variables, methods, and classes in a way that clearly indicates 
their purpose and intent. Follow the standard C# naming conventions, such as 
using PascalCase for class names and method names, and camelCase for variable names.

  .. list-table::
     :header-rows: 1
     :widths: 20 30 50

     * - Element
       - Casing Convention
       - Example

     * - Classes
       - PascalCase
       - ``InsertOneExample``, ``MongoClientSettings``

     * - Methods
       - PascalCase
       - ``InsertOne()``, ``GetCollection()``

     * - Variables
       - camelCase
       - ``mongoClient``, ``database``, ``collection``

     * - Static Fields
       - ``s_`` + camelCase
       - ``s_mongoClient``, ``s_database``, ``s_collection``

     * - Private Fields
       - _ + camelCase
       - ``_mongoClient``, ``_database``, ``_collection``

     * - Constants
       - PascalCase
       - ``MaxPoolSize``, ``DefaultTimeout``

Variables can be defined with ``var`` when the type is clear from the right-hand 
side of the assignment, but should be defined with an explicit type when the 
type is not obvious.

Object Models and Data Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Always create a new class for any data schema/model that you are using 
in an example. If all of the code using this class is contained within 
a single page, you can define the class within the same snippet (ideally 
at the top of the class.) If the class is used across multiple snippets, 
define it in a separate page.

If you are showing the model as part of the documentation, use the 
recommended property attributes, such as ``[BsonId]`` and ``[BsonElement]``, 
to make it clear how the model maps to the database:

.. code-block:: csharp

   public class Person
   {
      [BsonId]
      public ObjectId Id { get; set; }

      [BsonElement("person_id")]
      public string PersonId { get; set; } = "";

      [BsonElement("first_name")]
      public string FirstName { get; set; } = "";

      [BsonElement("last_name")]
      public string LastName { get; set; } = "";

      [BsonElement("date_of_birth")]
      public DateTime DateOfBirth { get; set; }
   }

.. _placeholders-csharp:

Placeholders
~~~~~~~~~~~~

- Use placeholders sparingly, such as for credentials, connection strings,
  or other values that are not essential to the example.
- Always include a comment above the line with the placeholder to explain what it
  represents and what value should be used to replace it.
- Ensure that any placeholder text in code is obvious. Format placeholders
  as directed in :ref:`api-placeholders`.

.. code-block:: csharp

   // Replace the placeholder with your MongoDB deployment's connection string
   var uri = "<your connection string>";
   var client = new MongoClient(uri);
   // ...


.. _indentation-java:

Tabs, Spaces, and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Indent with 4 spaces, *not* tabs.
- Place opening braces on the next line after the method declaration, and closing 
  braces on a new line after the code block. For example:

  .. code-block:: csharp

     public void insert() 
     {
         // ...
     }

- In method calls, place all aruments in one line, or if the line is too long, 
  break it up into multiple lines with one argument per line:

  .. code-block:: csharp

     SomeMethod(x, y, z); 

     // or

     SomeMethod(
         x,
         y,
         z);

     // but NOT
      
     DoNotDoThis(
      x, y, z);

- Avoid multi-line statements when possible by introducing intermediate variables. 
  For example:

  .. code-block:: csharp

     var x = some-very-long-expression-that-fills-most-of-a-line;
     var y = another-very-long-expression-that-fills-most-of-a-line;
     SomeMethod(x, y);

  And not:

  .. code-block:: csharp

     SomeMethod(
         some-very-long-expression-that-fills-most-of-a-line,
         another-very-long-expression-that-fills-most-of-a-line);

- Use one space before and after an infix operator like ``+`` and ``!=``

Testing Examples
~~~~~~~~~~~~~~~~

- Use the Grove platform to write and test your code examples.
  See :ref:`grove-platform` for more information.
- Use descriptive test names and the ``[Description]`` attribute to clearly 
  indicate what behavior the test is verifying. For example:

  .. code-block:: csharp

    [Test]
    [Description("Verifies that AutocompleteSearch() returns results for the title prefix 'Gravity'")]
    public void TestAutocompleteSearch()
    {
        var result = _examples.AutocompleteSearch();
        Expect.That(result.Any(m => m.Title == "Gravity")).ShouldMatch(true);
    }

- When possible, use the Grove Comparison API to verify output. See
  :ref:`grove-add-tests` for more information.
- Keep test setup minimal and focused on the behavior being demonstrated.
- Test every code example to ensure it works as intended:

  - When writing or reviewing, run the code that displays on the page.
  - For tutorials or multi-step examples, begin at the starting point and
    complete all steps exactly, including any prerequisites or setup. Don't
    skip steps, or assume they're correct or comprehensive.
  - If you have to make changes or take additional steps to get an example to
    work, make sure those changes are reflected in the documentation.

.. note::

   For any questions or for help writing or testing code examples, reach
   out to the DevDocs team or use the ``#ask-devdocs`` Slack channel.

.. _truncations-and-omissions-csharp:

Truncations and Omissions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Use a commented ellipsis (``...``) to denote where code has been
   deliberately omitted or truncated in an example.

   .. code-block:: csharp

      try
      {
        // ... some code that sets up the client, collection, and document to be inserted
        collection.InsertOne(doc)
      }
      catch (Exception e)
      {
        // ... handle error
      }

.. important::

   Always include an explanation comment when the ellipsis appears in a
   docs-facing code example (as opposed to tests).

