.. Create a directive that inserts a tabbed set of subdocuments.
.. Each subdocument CANNOT use structural elements such as sections. For this reason,
.. sections must be turned into the h1, h2, h3, ... directives below.

.. Caveat: these header tags do not create wrapping sections, and do not have permalinks.

.. (All of this is necessary because docutils "container" directive cannot contain sections,
..  and because sphinx section tags interfere with manual HTML markup.)

.. If you rename or modify the h1/h2/h3/h4... directives, make sure to change the template
.. extension appropriately.

.. register-template:: tabs
   :yaml:

   .. raw:: html

      <div class="tabs">
        <ul class="tab-strip tab-strip--singleton" role="tablist">
          {{ for tab in tabs sortLanguages }}
          {{ # Only render the tab here if i < 5 }}
          {{ if i lessThan(5) }}
          <li class="tab-strip__element" data-tabid="{{ tab.id }}" role="tab" aria-selected="{{ if i zero }}true{{ else }}false{{ end }}">{{ tab.name }}</li>
          {{ end }}
          {{ end }}
          {{ if tabs numberOfLanguages greaterThan(5) }}
          <li class="tab-strip__element dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown">Other <span class="caret"></span></a>
            <ul class="dropdown-menu tab-strip__dropdown" role="menu">
              {{ for tab in tabs sortLanguages }}
              {{ # Only render the tab here if i >= 5 }}
              {{ if i greaterThanOrEqual(5) }}
              <li data-tabid="{{ tab.id }}" aria-selected="{{ if i zero }}true{{ else }}false{{ end }}">{{ tab.name }}</li>
              {{ end }}
              {{ end }}
            </ul>
          </li>
          {{ end }}
        </ul>
        <div class="tabs__content" role="tabpanel">
          {{ for tab in tabs sortLanguages}}
          <div class="tabpanel-{{ tab.id }}">

   {{ tab.content convertSections }}

   .. raw:: html

          </div>
          {{ end }}
        </div>
      </div>


.. register-template:: h1

   .. raw:: html

      <h1>{{ title }}</h1>

.. register-template:: h2

   .. raw:: html

      <h2>{{ title }}</h2>

.. register-template:: h3

   .. raw:: html

      <h3>{{ title }}</h3>

.. register-template:: h4

   .. raw:: html

      <h4>{{ title }}</h4>
