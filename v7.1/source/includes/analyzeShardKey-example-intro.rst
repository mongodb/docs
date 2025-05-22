Consider a simplified version of a social media app. The collection 
we are trying to shard is the ``post`` collection. 

Documents in the ``post`` collection have the following schema:

.. code-block:: javascript
   :copyable: false

   {
      userId: <uuid>,
      firstName: <string>,
      lastName: <string>,
      body: <string>,  // the field that can be modified.
      date: <date>,    // the field that can be modified.
   }

Background Information
~~~~~~~~~~~~~~~~~~~~~~

- The app has 1500 users.
- There are 30 last names and 45 first names, some more common than 
  others. 
- There are three celebrity users. 
- Each user follows exactly five other users and has a very high 
  probability of following at least one celebrity user.

Sample Workload 
~~~~~~~~~~~~~~~

- Each user posts about two posts a day at random times. They edit each 
  post once, right after it is posted.
- Each user logs in every six hours to read their own profile and posts 
  by the users they follow from the past 24 hours. They also reply under 
  a random post from the past three hours.
- For every user, the app removes posts that are more than three days 
  old at midnight.

Workload Query Patterns
~~~~~~~~~~~~~~~~~~~~~~~

This workload has the following query patterns:

- ``find`` command with filter 
  ``{ userId: , firstName: , lastName: }``
- ``find`` command with filter 
  ``{ $or: [{ userId: , firstName: , lastName:, date: { $gte:  }, ] }``
- ``findAndModify`` command with filter 
  ``{ userId: , firstName: , lastName: , date:  }`` to 
  update the body and date field.
- ``update`` command with ``multi: false`` and filter 
  ``{ userId: , firstName: , lastName: , date: { $gte: , $lt:  } }`` 
  to update the body and date field.
- ``delete`` command with ``multi: true`` and filter 
  ``{ userId: , firstName: , lastName: , date: { $lt:  } }``

Below are example metrics returned by |analyzeShardKey| for some 
candidate shard keys, with sampled queries collected from seven days of 
workload.
