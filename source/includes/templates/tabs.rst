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
        <ul class="nav nav-tabs nav-justified">
          {{ for tab in tabs sortLanguages }}
          {{ # Only render the tab here if i < 5 }}
          {{ if i lessThan(5) }}
          <li{{ if i zero }} class="active"{{ end }}><a href="#{{ tab.id }}">{{ tab.name }}</a></li>
          {{ end }}
          {{ end }}
          {{ if tabs len greaterThan(4) }}
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown">Other <span class="caret"></span></a>
            <ul id="tab-dropdown" class="dropdown-menu">
              {{ for tab in tabs sortLanguages }}
              {{ # Only render the tab here if i >= 5 }}
              {{ if i greaterThanOrEqual(5) }}
              <li><a href="#{{ tab.id }}">{{ tab.name }}</a></li>
              {{ end }}
              {{ end }}
            </ul>
          </li>
          {{ end }}
        </ul>
        <div class="tab-content">
          {{ for tab in tabs sortLanguages}}
          <div class="{{ tab.id }}">

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
