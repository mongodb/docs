Use collation to specify language-specific rules for string comparison,
such as rules for lettercase and accent marks. The
:manual:`collation document </reference/collation/#collation-document>`
contains a ``locale`` field which indicates the `ICU Locale code
<http://userguide.icu-project.org/locale>`_, and may contain other
fields to define collation behavior.

.. example::

   The following collation option document specifies a locale value
   of ``fr`` for a French language collation:
   
   .. code-block:: json

      { "locale": "fr" }

To review the list of locales that MongoDB collation supports, see
the :ref:`list of languages and locales
<collation-languages-locales>`. To learn more about collation
options, including which are enabled by default for each locale, see
:ref:`Collation <collation-document-fields>` in the MongoDB manual.
