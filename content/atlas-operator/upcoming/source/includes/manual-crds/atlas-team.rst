.. _atlasteam: 

AtlasTeam
---------

AtlasTeam is the Schema for the Atlas Teams API

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasTeam``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``TeamSpec`` defines the desired state of a Team in Atlas.
     - true

   * -  ``status``
     - object
     -  
     - false

.. _atlasteam-spec: 

AtlasTeam.spec
~~~~~~~~~~~~~~

TeamSpec defines the desired state of a Team in Atlas.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - The ``name`` of the team you want to create.
     - true

   * -  ``usernames``
     - []string
     - Valid email addresses of users to add to the new team.
     - true

.. _atlasteam-status: 

AtlasTeam.status
~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``id``
     - string
     - ``ID`` of the team
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``projects``
     - []object
     - List of ``projects`` which the team is assigned
     - false

.. _atlasteam-status-conditions: 

AtlasTeam.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition, one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false

.. _atlasteam-status-projects: 

AtlasTeam.status.projects
~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - Unique identifier of the project inside atlas
     - true

   * -  ``name``
     - string
     - Name given to the project
     - true
