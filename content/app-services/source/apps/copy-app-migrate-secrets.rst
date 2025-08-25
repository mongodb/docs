An App's configuration files do not include the names or values of any
:ref:`Secrets <app-secret>`.

You must have access to the original App's existing Secret values and
add them manually to the new App. If your app doesn't have any Secrets,
you can skip this step.

To add the secrets from your original App:

#. Get the names of all the secrets from the exported app by following
   the :ref:`view secrets documentation <list-secrets>`.

#. Save the names of all the secrets to a secure location. The list
   won't include the actual Secret values, but it's useful to have a
   list of the Secret names to add to your new App.

#. Find the value for each of the original App's Secrets.

#. Add each Secret individually to the new App. To learn how, see
   :ref:`Define a Secret <define-secret>`.

.. important:: Add Secrets Before You Copy Configuration Files

   Some App Services features require you to have one or more Secrets
   defined before you can define and use the feature. For example, OAuth
   authentication providers require a Secret that contains a
   ``clientSecret`` value.

   If you push configuration files that reference undefined Secrets, the
   deployment will fail.
