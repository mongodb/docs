a. Add the MongoDB Java Driver to your project as a dependency.

   For installation instructions, see the 
   :driver:`MongoDB Java Driver documentation </java/current>`.

#. Create the index.

   .. tabs::

    .. tab:: autocomplete
       :tabid: autocomplete
    
       The following code creates an autocomplete index on the ``plot`` field.
    
       .. literalinclude:: /includes/partial-match-tutorial/code-snippets/java/CreateAutoCompleteIndex.java

    .. tab:: string
       :tabid: string

       The following code creates a string index on the ``plot`` field.

       .. literalinclude:: /includes/partial-match-tutorial/code-snippets/java/CreateStringIndex.java 


   .. include:: /includes/shared/facts/steps-connection-string-drivers-hidden.rst

#. Compile and run the program.

   .. code-block:: shell

      javac CreateIndex.java
      java CreateIndex