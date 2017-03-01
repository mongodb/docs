Some collation locales have variants, which employ special
language-specific rules. To specify a locale variant, use the following
syntax:

.. code-block:: javascript

   { "locale" : "<locale code>@collation=<variant>" }

For example, to use the ``pinyin`` variant of the Chinese collation:

.. code-block:: javascript

   { "locale" : "zh@collation=pinyin" }
