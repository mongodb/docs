To enable background tasks for your app:

.. procedure::

   .. step:: Add Background Modes Capability

      Select your app Target, go to the :guilabel:`Signing & Capabilities`
      tab, and click :guilabel:`+ Capability` to add the capability.

      .. figure:: /images/xcode-select-target-add-capability.png
         :alt: Screenshot of Xcode with app Target selected, Signing & Capabilities tab open, and arrow pointing to add Capabilities.
         :lightbox:

      Search for "background", and select :guilabel:`Background Modes`.

   .. step:: Select Background Modes

      Now you should see a :guilabel:`Background Modes` section in your 
      :guilabel:`Signing & Capabilities` tab. Expand this section, and 
      click the checkboxes to enable :guilabel:`Background fetch` and
      :guilabel:`Background processing`.

   .. step:: Update the Info.plist

      Go to your project's :file:`Info.plist`, and add a new row for 
      ``Permitted background task scheduler identifiers``. If you are 
      viewing raw keys and values, the key is 
      ``BGTaskSchedulerPermittedIdentifiers``. This field is an array. 
      Add a new item to it for your background task identifier. Set the 
      new item's value to the string you intend to use as the identifier 
      for your background task. For example: ``refreshTodoRealm``.
