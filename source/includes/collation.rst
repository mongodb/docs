To specify a collation for your operation, pass an ``$options`` array
parameter that sets the ``collation`` option to the operation method.
Assign the ``collation`` option to an array that configures the collation
rules.

The following table describes the fields you can set to configure
the collation:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Field
     - Description

   * - ``locale``
     - | *(Required)* Specifies the International Components for Unicode (ICU) locale. For a
         list of supported locales, see :manual:`Collation Locales and Default Parameters
         </reference/collation-locales-defaults/#supported-languages-and-locales>`
         in the {+mdb-server+} manual.
       |
       | **Data Type**: {+string-data-type+}

   * - ``caseLevel``
     - | *(Optional)* Specifies whether to include case comparison.
       |
       | When set to ``true``, the comparison behavior depends on the value of
         the ``strength`` field:
       |
       | - If ``strength`` is ``1``, the {+library-short+} compares base
       |   characters and case.
       |
       | - If ``strength`` is ``2``, the {+library-short+} compares base
       |   characters, diacritics, other secondary differences, and case.
       |
       | - If ``strength`` is any other value, this field is ignored.
       |
       | When set to ``false``, the {+library-short+} doesn't include case comparison at
         strength level ``1`` or ``2``.
       |
       | **Data Type**: {+bool-data-type+} 
       | **Default**: ``false``

   * - ``caseFirst``
     - | *(Optional)* Specifies the sort order of case differences during tertiary
         level comparisons.
       |
       | **Data Type**: {+string-data-type+} 
       | **Default**: ``"off"``

   * - ``strength``
     - | *(Optional)* Specifies the level of comparison to perform, as defined in the
         `ICU documentation <https://unicode-org.github.io/icu/userguide/collation/concepts.html#comparison-levels>`__.
       |
       | **Data Type**: {+int-data-type+} 
       | **Default**: ``3``

   * - ``numericOrdering``
     - | *(Optional)* Specifies whether the driver compares numeric strings as numbers.
       | 
       | If set to ``true``, the {+library-short+} compares numeric strings as numbers.
         For example, when comparing the strings "10" and "2", the library uses the
         strings' numeric values and treats "10" as greater than "2".
       |  
       | If set to ``false``, the {+library-short+} compares numeric strings
         as strings. For example, when comparing the strings "10" and "2", the library
         compares one character at a time and treats "10" as less than "2".
       |
       | For more information, see :manual:`Collation Restrictions </reference/collation/#restrictions>`
         in the {+mdb-server+} manual.
       |
       | **Data Type**: {+bool-data-type+}
       | **Default**: ``false``

   * - ``alternate``
     - | *(Optional)* Specifies whether the library considers whitespace and punctuation as base
         characters for comparison purposes.
       |
       | **Data Type**: {+string-data-type+}
       | **Default**: ``"non-ignorable"``

   * - ``maxVariable``
     - | *(Optional)* Specifies which characters the library considers ignorable when
         the ``alternate`` field is set to ``"shifted"``.
       |
       | **Data Type**: {+string-data-type+}
       | **Default**: ``"punct"``

   * - ``backwards``
     - | *(Optional)* Specifies whether strings containing diacritics sort from the back of the string
         to the front.
       |
       | **Data Type**: {+bool-data-type+} 
       | **Default**: ``false``

To learn more about collation and the possible values for each field, see the :manual:`Collation </reference/collation>`
entry in the {+mdb-server+} manual.